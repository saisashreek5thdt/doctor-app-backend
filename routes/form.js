const router = require("express").Router();

const form = require('../controllers/form');

const { checkPatient } = require('../middleware/auth');

const { authorize } = require("../middleware/auth");

router.get('/get-all', authorize(), form.getAll);
// router.get('/get/:id', authorize("doctor"), form.getBypatient)
router.post('/submit-form', authorize("patient"), form.submitForm);
router.put('/deactivate/:id', authorize("admin"), form.deactivate);
router.put('/activate/:id', authorize("admin"), form.activate);

module.exports = router;