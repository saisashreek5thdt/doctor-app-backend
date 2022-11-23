const router = require("express").Router();

const form = require('../controllers/form');
const appointment = require('../controllers/appointment')

router.get('/forms', form.getAll);
router.post('/create-appointment', appointment.create);
router.get('/get-appointments', appointment.getAll)

module.exports = router;