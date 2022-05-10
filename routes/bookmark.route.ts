import { Router } from 'express';

import BookmarkController from '../controllers/bookmark.controller';

export const router = Router();

router.post('/', BookmarkController.addBookmark);
router.get('/', BookmarkController.getBookmarks);
router.get('/:id', BookmarkController.getBookmark);
router.put('/:id', BookmarkController.editBookmark);
router.delete('/:id', BookmarkController.deleteBookmark);

export default router;
