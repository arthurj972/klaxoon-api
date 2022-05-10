import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface BookmarkAttributes {
  id: number;
  title: string;
  url: string;
  author: string;
  thumbnail: string;
  upload_date: Date | null;
  type: string;
  width: number;
  height: number;
  duration: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface BookmarkInput extends Optional<BookmarkAttributes, 'id'> {}
export interface BookmarkOuput extends Required<BookmarkAttributes> {}

class Bookmark
	extends Model<BookmarkAttributes, BookmarkInput>
	implements BookmarkAttributes
{
	public id!: number;

	public title!: string;

	public url!: string;

	public author!: string;

	public thumbnail!: string;

	public upload_date!: Date | null;

	public type!: string;

	public width!: number;

	public height!: number;

	public duration!: number | null;

	// timestamps!
	public readonly createdAt!: Date;

	public readonly updatedAt!: Date;

	public readonly deletedAt!: Date;
}

Bookmark.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		thumbnail: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		upload_date: {
			type: DataTypes.DATE,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		width: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		height: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		duration: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: true,
		sequelize: sequelizeConnection,
		paranoid: true,
		indexes: [{ fields: ['title', 'type'], unique: true }],
	}
);

export default Bookmark;
