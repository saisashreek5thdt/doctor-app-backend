const router = require("express").Router();

const obs = require('../controllers/observations');

const { authorize } = require("../middleware/auth");

router.post('/', authorize("patient"),  obs.add);
router.get('/', authorize(), obs.getAll);

module.exports = router;