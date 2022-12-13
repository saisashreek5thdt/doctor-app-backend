const router = require("express").Router();

const form = require('../controllers/form');

const { checkPatient } = require('../middleware/auth');

router.get('/get-all', form.getAll);
router.post('/submit-form', form.submitForm);

module.exports = router;