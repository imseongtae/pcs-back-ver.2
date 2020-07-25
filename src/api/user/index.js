const { Router } = require('express');
const router = Router();

const ctrl = require('./user.ctrl');

// index
router.get('/', ctrl.index);
// read user
router.get('/:id', ctrl.read);
// create user
router.post('/', ctrl.create);
// update user
router.put('/:id', ctrl.update);
// delete user
router.delete('/:id', ctrl.destroy);

module.exports = router;
