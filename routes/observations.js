const router = require("express").Router();

const obs = require('../controllers/observations')

router.post('/:id', obs.add);
router.get('/:id', obs.getAll);

module.exports = router;