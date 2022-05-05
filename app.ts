import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const bodyParser = require('body-parser');

const bookmarkRoutes = require('./routes/bookmark.route');

dotenv.config()

const app: Express = express();

if (process.env.BDD_NAME && process.env.BDD_USER && process.env.BDD_PASS && process.env.BDD_HOST && process.env.BDD_PORT) {
	const sequelize = require('./utils/database');
	
	(async ()=> {
		try {
			await sequelize.authenticate();
			console.log('Connection has been established successfully.');
			
			// await sequelize.sync({force:true}).catch((error:any)=> {
			// 	console.error('ERROR', error.message);
			// });
			
			// Parsers for POST data
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({ extended: true }));

			app.get('/', (_req: Request, res: Response) => {
				res.send('API Works');
			});

			app.use('/bookmark', bookmarkRoutes);

			app.use((_req, res) => {
				res.status(404).send('Route not found');
			})
		} catch (error: any) {
			console.error('Unable to connect to the database:', error.message);
		}
	})()
} else {
	console.error('Environment variables aren\'t defined.');
}

module.exports = app;