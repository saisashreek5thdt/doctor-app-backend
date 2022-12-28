const router = require("express").Router();

const profile = require('../controllers/profile');

const { authorize } = require("../middleware/auth");

router.get('/patient', authorize("patient"), profile.patient);
router.get('/doctor', authorize("doctor"), profile.doctor);

module.exports = router;