const router = require("express").Router();

const form = require('../controllers/form');

const { checkPatient } = require('../middleware/auth');

const { authorize } = require("../middleware/auth");

router.get('/get-all', authorize(), form.getAll);
router.post('/submit-form', authorize("patient"), form.submitForm);

module.exports = router;