const router = require("express").Router();

const appointment = require('../controllers/appointment')

router.post('/create', appointment.create);
router.get('/get-all', appointment.getAll)

module.exports = router;