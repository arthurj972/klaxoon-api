import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

const sequelize = new Sequelize(process.env.BDD_NAME!, process.env.BDD_USER!, process.env.BDD_PASS, {
	host: process.env.BDD_HOST,
	port: parseInt(process.env.BDD_PORT!),
	dialect: 'mysql'
});

module.exports = sequelize