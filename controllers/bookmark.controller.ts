import { Request, Response } from 'express';
import Joi from 'joi';
import { parseISO } from 'date-fns';
import axios from 'axios';
import * as service from '../services/bookmark.service';
import { BookmarkInput } from '../db/models/Bookmark';

export default {
	async addBookmark (req: Request, res: Response) {
		const schema = Joi.object({
			url: Joi.string().uri().required(),
		});

		function getBookmark(
			url: string,
			vimeo: boolean = true
		): Promise<BookmarkInput> {
			return new Promise((resolve, reject) => {
				let hostUrl = 'https://vimeo.com';
				let apiUrl = `${hostUrl}/api/oembed.json?url=${url}`;
				if (!vimeo) {
					hostUrl = 'https://www.flickr.com';
					apiUrl = `${hostUrl}/services/oembed/?format=json&url=${url}`;
				}

				try {
					axios.get(apiUrl).then((response) => {
						const { data } = response;

						if (
							(data.type === 'video' && vimeo) || (data.type === 'photo' && !vimeo)
						) {
							const bookmark = {
								title: data.title,
								url: data.uri ? `${hostUrl}${data.uri}` : data.web_page_short_url,
								author: data.author_name,
								thumbnail: data.thumbnail_url,
								upload_date: data.upload_date
									? parseISO(data.upload_date)
									: null,
								type: data.type,
								width: data.width,
								height: data.height,
								duration: data.duration ? data.duration : null,
							};
							resolve(bookmark);
						} else if (data.type !== 'video' && vimeo) {
							reject(new Error('Seules les vidéos sont autorisées sur Vimeo.'));
						} else {
							reject(new Error('Seules les photos sont autorisées sur Flickr.'));
						}
					});
				} catch (error) {
					reject(error);
				}
			});
		}

		try {
			const body = await schema.validateAsync(req.body);

			const regexVimeo =
        /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/g;
			const regexFlickr =
        /(?:http|https)?:?\/?\/?(?:www\.)?flickr\.com\/(?:photos\/(?:\w+\/)?)(\d+)(?:|\/\?)/g;
			const isVimeoUrl = body.url.match(regexVimeo);
			const isFlickrUrl = body.url.match(regexFlickr);

			if (isVimeoUrl != null || isFlickrUrl != null) {
				let bookmarkTosave: BookmarkInput | void;
				if (isVimeoUrl != null) {
					const url = isVimeoUrl[0];
					bookmarkTosave = await getBookmark(url).catch((error) => {
						res.status(500).send(error.message);
					});
				}

				if (isFlickrUrl != null) {
					const url = isFlickrUrl[0];
					bookmarkTosave = await getBookmark(url, false).catch((error) => {
						res.status(500).send(error.message);
					});
				}

				if (bookmarkTosave) {
					const bookmarkSaved = await service
						.create(bookmarkTosave)
						.catch((error: any) => {
							if (error.parent && error.parent.code === 'ER_DUP_ENTRY') {
								res.status(409).send('Vous avez déjà rentré cette URL');
							} else {
								res.status(409).send(error.message);
							}
						});
					if (bookmarkSaved) {
						res.status(201).json({ id: bookmarkSaved.id });
					}
				} // don't need to else
			} else {
				res
					.status(400)
					.send(
						'Nous ne prenons en charge que Vimeo et Flickr pour le moment. Désolé.'
					);
			}
		} catch (error: any) {
			res.status(400).send(error.message);
		}
	},
	async getBookmarks (req: Request, res: Response) {
		// get list
		const bookmarks = await service.getAll().catch((error: any) => {
			res.status(400).send(error.message);
		});
		if (bookmarks) {
			res.status(200).json({
				bookmarks,
			});
		}
	},
	async getBookmark (req: Request, res: Response) {
		// get with id
		const id = parseInt(req.params.id, 10);
		if (id) {
			const bookmark = await service.getById(id).catch((error: any) => {
				if (error.message === 'not found') {
					res.status(404).send('Bookmark not found');
				} else {
					res.status(400).send(error.message);
				}
			});
			if (bookmark) {
				res.status(200).json({
					bookmark,
				});
			}
		} else {
			res.status(500).send('L\'id doit être un nombre');
		}
	},
	async editBookmark (req: Request, res: Response) {
		// edit with id
		const schema = Joi.object({
			title: Joi.string().max(255).required(),
		});

		try {
			const body = await schema.validateAsync(req.body);
			const id = parseInt(req.params.id, 10);
			if (id) {
				const edited = await service
					.update(id, {
						title: body.title,
					})
					.catch((error: any) => {
						if (error.message === 'not found') {
							res.status(404).send('Bookmark not found');
						} else {
							res.status(400).send(error.message);
						}
					});
				if (edited) {
					res.status(200).json({
						done: true,
					});
				}
			} else {
				res.status(500).send('L\'id doit être un nombre');
			}
		} catch (error: any) {
			res.status(400).send(error.message);
		}
	},
	async deleteBookmark (req: Request, res: Response) {
		// delete with id
		const id = parseInt(req.params.id, 10);
		if (id) {
			const deleted = await service.deleteById(id).catch((error: any) => {
				res.status(400).send(error.message);
			});
			if (deleted) {
				res.status(200).json({
					done: true,
				});
			} else {
				res.status(404).send('Bookmark not found');
			}
		} else {
			res.status(500).send('L\'id doit être un nombre');
		}
	},
};
