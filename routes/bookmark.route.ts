import { Router } from 'express';
export const router = Router();

const bookmarkController = require('../controllers/bookmark.controller');

router.post('/', bookmarkController.addBookmark);
router.get('/', bookmarkController.getBookmarks);
router.get('/:id', bookmarkController.getBookmark);
router.put('/:id', bookmarkController.editBookmark);
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;
