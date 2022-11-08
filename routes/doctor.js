const router = require("express").Router();

const { addPatient, getAllPatients, getPatient } = require('../controllers/patient/patient');

router.post('/add-patient', addPatient);
router.get('/get-all-patients', getAllPatients);
router.get('/patient/:id', getPatient);

module.exports = router;