const { Router } = require('express');
const router = Router();
const { isAuthenticated } = require('../../libs/jwt');

const ctrl = require('./post.ctrl');

// index post
router.get('/', ctrl.index);
// read post
router.get('/:id', ctrl.read);
// create post
router.post('/', isAuthenticated(), ctrl.create);
// update post
router.put('/:id', isAuthenticated(), ctrl.update);
// delete post
router.delete('/:id', isAuthenticated(), ctrl.destroy);

module.exports = router;
