const { Router } = require('express');
const router = Router();

const ctrl = require('./performance.ctrl');

// read performance - GET /performances/
router.get('/', ctrl.index);
// read performance - GET /performances/:mt20id
router.get('/:mt20id', ctrl.read);

module.exports = router;
