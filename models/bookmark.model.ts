import { DataTypes, Sequelize } from 'sequelize';
const sequelize = require('../utils/database')

const Bookmark: Sequelize = sequelize.define('bookmark', {
	url: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false
	},
	thumbnail: {
		type: DataTypes.STRING,
		allowNull: false
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW
	},
	upload_date: {
		type: DataTypes.DATE
	},
	user_id: {
		type: DataTypes.STRING,
		allowNull: false
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false
	},
	width: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	height: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	duration: {
		type: DataTypes.INTEGER
	}
}, {
	uniqueKeys: {
		actions_unique: {
			fields: ['title', 'type', 'user_id']
		}
	}
});

module.exports = Bookmark;
