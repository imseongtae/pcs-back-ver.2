const { Router } = require('express');
const router = Router();

const ctrl = require('./facility.ctrl');

// index facility
router.get('/', ctrl.index);
// read facility
router.get('/:mt10id', ctrl.read);

module.exports = router;
