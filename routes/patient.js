const router = require("express").Router();

const form = require('../controllers/form');
const appointment = require('../controllers/appointment')
const obs = require('../controllers/observations')

const { authorize } = require("../middleware/auth");

router.get('/forms', authorize("patient"), form.getAll);
router.post('/create-appointment', authorize("patient"), appointment.create);
router.get('/get-appointments', authorize("patient"), appointment.getAll)
router.post('/observaions', authorize("patient"), obs.add);

module.exports = router;