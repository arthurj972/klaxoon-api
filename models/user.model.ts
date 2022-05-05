import { Sequelize, DataTypes } from 'sequelize';
const sequelize = require('../utils/database')

const User: Sequelize = sequelize.define('user', {
	firstname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

module.exports = User;
