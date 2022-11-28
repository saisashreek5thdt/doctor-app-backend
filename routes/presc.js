const router = require("express").Router();

const presc = require('../controllers/presc')

router.post('/add', presc.add);
router.get('/get-all', presc.getAll);

module.exports = router;