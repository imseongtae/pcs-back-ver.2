const { Router } = require('express');
const router = Router();

const ctrl = require('./memo.ctrl');

// index memo
router.get('/', ctrl.index);
// read memo
router.get('/:id', ctrl.read);
// create memo
router.post('/', ctrl.create);
// update memo
// router.put('/:id', ctrl.update);
// delete memo
router.delete('/:id', ctrl.destroy);

module.exports = router;
