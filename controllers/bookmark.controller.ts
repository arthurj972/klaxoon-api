import { Request, Response } from 'express';
import Joi from 'joi';
import moment from 'moment';
import axios from 'axios';

moment.locale(process.env.LOCALE);

const BookmarkModel = require('../models/bookmark.model');
import {BookmarkInterface} from '../interfaces/bookmark.interface';

exports.addBookmark = async (req: Request, res: Response) => {

	const schema = Joi.object({
		url: Joi.string().uri().required()
	});
	
	try {
		const body = await schema.validateAsync(req.body);
		
		const regexVimeo = /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/g
		const regexFlickr = /(?:http|https)?:?\/?\/?(?:www\.)?flickr\.com\/(?:photos\/(?:\w+\/)?)(\d+)(?:|\/\?)/g
		const isVimeoUrl = body.url.match(regexVimeo);
		const isFlickrUrl = body.url.match(regexFlickr);

		
		if(isVimeoUrl != null || isFlickrUrl != null) {
			let bookmarkTosave: BookmarkInterface | void;
			if(isVimeoUrl != null) {
				const url = isVimeoUrl[0];
				bookmarkTosave = await getBookmark(url).catch((error) => {
					res.status(500).send(error.message);
				});
			}
			
			if(isFlickrUrl != null) {
				const url = isFlickrUrl[0];
				bookmarkTosave = await getBookmark(url, false).catch((error) => {
					res.status(500).send(error.message);
				});
			}
			
			if (bookmarkTosave) {
				const bookmarkSaved = await BookmarkModel.create(bookmarkTosave).catch((error:any) => {
					if (error.parent && error.parent.code === 'ER_DUP_ENTRY') {
						res.status(409).send('Vous avez déjà rentré cette URL');
					} else {
						res.status(409).send(error.message);
					}
				});
				if(bookmarkSaved) {
					res.status(201).json({id: bookmarkSaved.id});
				}
			} // don't need to else
		} else {
			res.status(400).send('Nous ne prenons en charge que Vimeo et Flickr pour le moment. Désolé.');
		}
	} catch (error: any) {
		res.status(400).send(error.message);
	}

	function getBookmark(url:string, vimeo: boolean = true): Promise<BookmarkInterface> {
		return new Promise(async (resolve, reject) => {
			let hostUrl = 'https://vimeo.com';
			let apiUrl = `${hostUrl}/api/oembed.json?url=${url}`;
			if (!vimeo) {
				hostUrl = 'https://www.flickr.com';
				apiUrl = `${hostUrl}/services/oembed/?format=json&url=${url}`;
			}

			try {
				const response = await axios.get(apiUrl);
				const data:any = response.data;

				if ((data.type === 'video' && vimeo) || (data.type === 'photo' && !vimeo)) {
					let bookmark = {
						title: data.title,
						url: data.uri ? `${hostUrl}${data.uri}`: data.web_page_short_url,
						author: data.author_name,
						thumbnail: data.thumbnail_url,
						upload_date: data.upload_date ? moment(data.upload_date, 'YYYY-MM-DD HH:mm:ss').toDate() : null,
						user_id: 1, // TODO: only for test
						type: data.type,
						width: data.width,
						height: data.height,
						duration: data.duration ? data.duration : null
					};
					resolve(bookmark);
				} else {
					if (data.type != 'video' && vimeo) {
						reject(new Error('Seules les vidéos sont autorisées sur Vimeo.'));
					} else {
						reject(new Error('Seules les photos sont autorisées sur Flickr.'));
					}
				}
				
			} catch (error) {
				reject(error);
			}
		});
	}
};

exports.getBookmarks = async (req: Request, res: Response) => {
	// get list
	let bookmarks = await BookmarkModel.findAll({
		where: {
			user_id: 1, // TODO: only for test

		}
	  }).catch((error: any) => {
		res.status(400).send(error.message);
	});
	if (bookmarks) {
		res.status(200).json({
			bookmarks: bookmarks
		});
	}
}

exports.getBookmark = async (req: Request, res: Response) => {
	// get with id
	if (parseInt(req.params.id)) {
		let bookmark = await BookmarkModel.findOne({
			where: {
				user_id: 1, // TODO: only for test
				id: req.params.id
			}
		}).catch((error: any) => {
			res.status(400).send(error.message);
		});
		if (bookmark) {
			res.status(200).json({
				bookmark: bookmark
			});
		} else {
			res.status(404).send('Bookmark not found or you don\'t have permission');
		}
	} else {
		res.status(500).send('L\'id doit être un nombre');
	}
}

exports.editBookmark = async (req: Request, res: Response) => {
	// edit with id
	const schema = Joi.object({
		title: Joi.string().max(255).required()
	});
	
	try {
		const body = await schema.validateAsync(req.body);
		if (parseInt(req.params.id)) {
			let edited = await BookmarkModel.update({ 
				title: body.title
			},
			{ 
				where: {
					user_id: 1, // TODO: only for test
					id: req.params.id
				}
			}).catch((error: any) => {
				res.status(400).send(error.message);
			});
			if (edited[0] === 1) {
				res.status(200).json({
					done: true
				});
			} else {
				res.status(404).send('Bookmark not found or you don\'t have permission');
			}
		} else {
			res.status(500).send('L\'id doit être un nombre');
		}
	} catch (error: any) {
		res.status(400).send(error.message);
	}
}

exports.deleteBookmark = async (req: Request, res: Response) => {
	// delete with id
	if (parseInt(req.params.id)) {
		let deleted = await BookmarkModel.destroy({
			where: {
				user_id: 1, // TODO: only for test
				id: req.params.id
			}
		}).catch((error: any) => {
			res.status(400).send(error.message);
		});
		if (deleted === 1) {
			res.status(200).json({
				done: true
			});
		} else {
			res.status(404).send('Bookmark not found or you don\'t have permission');
		}
	} else {
		res.status(500).send('L\'id doit être un nombre');
	}
}