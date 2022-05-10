import Bookmark from './models/Bookmark';

const dbInit = () => {
	Bookmark.sync({ alter: true });
};
export default dbInit;
