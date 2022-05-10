import * as bookmarkDal from '../db/dal/bookmark';
import { BookmarkInput, BookmarkOuput } from '../db/models/Bookmark';

export const create = (payload: BookmarkInput): Promise<BookmarkOuput> =>
	bookmarkDal.create(payload);
export const update = (
	id: number,
	payload: Partial<BookmarkInput>
): Promise<BookmarkOuput> => bookmarkDal.update(id, payload);
export const getById = (id: number): Promise<BookmarkOuput> =>
	bookmarkDal.getById(id);
export const deleteById = (id: number): Promise<boolean> =>
	bookmarkDal.deleteById(id);
export const getAll = (): Promise<BookmarkOuput[]> => bookmarkDal.getAll();
