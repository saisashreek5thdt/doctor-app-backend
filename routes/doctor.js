const router = require("express").Router();

const { addPatient, getAllPatients, getPatient, editPatient } = require('../controllers/patient/patient');
const dietChart = require('../controllers/diet-chart');

router.post('/add-patient', addPatient);
router.get('/get-all-patients', getAllPatients);
router.get('/patient/:id', getPatient);
router.put('/edit-patient/:id', editPatient);
router.post('/add-diet-chart', dietChart.addDietChart);

module.exports = router;