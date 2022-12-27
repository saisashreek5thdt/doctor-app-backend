const router = require("express").Router();

const presc = require('../controllers/presc');

const { authorize } = require("../middleware/auth");

router.post('/add', authorize("doctor"), presc.add);
router.get('/get-all', authorize(), presc.getAll);

module.exports = router;