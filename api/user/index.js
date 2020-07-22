const { Router } = require('express');
const router = Router();

const ctrl = require('./user.ctrl');

router.get('/', ctrl.index);

router.post('/', ctrl.create);

module.exports = router;
