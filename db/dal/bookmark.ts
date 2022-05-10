import Bookmark, { BookmarkInput, BookmarkOuput } from '../models/Bookmark';

export const create = async (
	payload: BookmarkInput
): Promise<BookmarkOuput> => {
	const bookmark = await Bookmark.create(payload);
	return bookmark;
};

export const update = async (
	id: number,
	payload: Partial<BookmarkInput>
): Promise<BookmarkOuput> => {
	const bookmark = await Bookmark.findByPk(id);
	if (!bookmark) {
		throw new Error('not found');
	}
	const updatedBookmark = await (bookmark as Bookmark).update(payload);
	return updatedBookmark;
};

export const getById = async (id: number): Promise<BookmarkOuput> => {
	const bookmark = await Bookmark.findByPk(id);
	if (!bookmark) {
		// @todo throw custom error
		throw new Error('not found');
	}
	return bookmark;
};

export const deleteById = async (id: number): Promise<boolean> => {
	const deletedBookmarkCount = await Bookmark.destroy({
		where: { id },
		force: true,
	});
	return !!deletedBookmarkCount;
};

export const getAll = async (): Promise<BookmarkOuput[]> =>
	Bookmark.findAll({});
