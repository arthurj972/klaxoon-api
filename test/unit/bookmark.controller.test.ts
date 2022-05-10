/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import httpMocks from 'node-mocks-http';
import BookmarkController from '../../controllers/bookmark.controller';


let req: Request;
let res: Response;

beforeEach(() => {
	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
});

describe('BookmarkController.addBookmark', () => {
	beforeEach(() => {
		req.body = {
			url: 'https://vimeo.com/286898202',
		};
	});

	it('should have a addBookmark function', () => {
		expect(typeof BookmarkController.addBookmark).toBe('function');
	});

	it('should return 409 response with same url', async () => {
		await BookmarkController.addBookmark(req, res);
		expect(res.statusCode).toBe(409);
	});
});

describe('BookmarkController.editBookmark', () => {
	beforeEach(() => {
		req.params.id = '1';
		req.body = {
			title: 'Un titre différent :)',
		};
	});

	it('should have a editBookmark function', () => {
		expect(typeof BookmarkController.editBookmark).toBe('function');
	});
	it('should return 200 response code', async () => {
		await BookmarkController.editBookmark(req, res);
		expect(res.statusCode).toBe(200);
	});
});
