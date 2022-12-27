const router = require("express").Router();

const appointment = require('../controllers/appointment');

const { authorize } = require("../middleware/auth");

router.post('/create', authorize("patient"), appointment.create);
router.get('/get-all/:date', authorize("doctor"), appointment.getWithDate)
router.get('/get-all', authorize("patient"), appointment.getAll)

module.exports = router;