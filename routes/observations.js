const router = require("express").Router();

const obs = require('../controllers/observations');

const { authorize } = require("../middleware/auth");

router.post('/:id', authorize("patient"),  obs.add);
router.get('/:id', authorize(), obs.getAll);

module.exports = router;