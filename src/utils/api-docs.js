const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-spec.json');
const { version } = require('../../package.json');
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.status(200).json({ version });
});

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/api/v1', router);

module.exports = router;
