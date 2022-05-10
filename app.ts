/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dbInit from './db/init';
import bookmarkRoutes from './routes/bookmark.route';


const app: Express = express();

dbInit();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
	res.send('API Works');
});

app.use('/bookmark', bookmarkRoutes);

app.use((_req, res) => {
	res.status(404).send('Route not found');
});

export default app;
