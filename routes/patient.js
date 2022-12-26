const router = require("express").Router();

const form = require('../controllers/form');
const appointment = require('../controllers/appointment')
const obs = require('../controllers/observations')

router.get('/forms', form.getAll);
router.post('/create-appointment', appointment.create);
router.get('/get-appointments', appointment.getAll)
router.post('/observaions', obs.add);

module.exports = router;