import { Dialect, Sequelize } from 'sequelize';

const dbName = process.env.BDD_NAME as string;
const dbUser = process.env.BDD_USER as string;
const dbPort = parseInt(process.env.BDD_PORT!, 10) as number;
const dbHost = process.env.BDD_HOST;
const dbDriver = process.env.BDD_DRIVER as Dialect;
const dbPassword = process.env.BDD_PASS;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
	host: dbHost,
	port: dbPort,
	dialect: dbDriver,
	logging: false,
});

export default sequelizeConnection;
