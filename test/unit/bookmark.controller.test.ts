const BookmarkController = require('../../controllers/bookmark.controller');
const BookmarkModel = require('../../models/bookmark.model');
import { BookmarkInterface } from '../../interfaces/bookmark.interface';
const httpMocks = require('node-mocks-http');

import { Request, Response } from 'express';
import moment from 'moment';

const bookmarkTest: BookmarkInterface | void = {
	user_id: 1,
	url: "https://vimeo.com/videos/704606471",
	title: "CUCO - CAUTION",
	author: "Cole Kush",
	thumbnail: "https://i.vimeocdn.com/video/1422806866-314556c46374649024296abbde521690f1dfba5b2a2fce67758843eaca369d66-d_295x166",
	upload_date: moment('2018-08-27 10:57:40', 'YYYY-MM-DD HH:mm:ss').toDate(),
	type: "video",
	width: 426,
	height: 240,
	duration: 184
};

let req: Request, res: Response;
beforeEach(() => {
	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
});

describe("BookmarkController.addBookmark", () => {
	beforeEach(() => {
		req.body = {
			url: 'https://vimeo.com/286898202'
		};
	});

	it("should have a addBookmark function", () => {
		expect(typeof BookmarkController.addBookmark).toBe("function");
	});

	it("should return 409 response with same url", async () => {
		await BookmarkController.addBookmark(req, res);
		expect(res.statusCode).toBe(409);
	});
});

describe("BookmarkController.editBookmark", () => {
	beforeEach(() => {
		req.params.id = '12';
		req.body = {
			title: 'Un titre différent :)'
		};
	});

	it("should have a editBookmark function", () => {
		expect(typeof BookmarkController.editBookmark).toBe("function");
	});
	it("should return 200 response code", async () => {
		await BookmarkController.editBookmark(req, res);
		expect(res.statusCode).toBe(200);
	});
});
