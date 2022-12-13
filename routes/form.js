const router = require("express").Router();

const form = require('../controllers/form');

const { checkPatient } = require('../middleware/auth');

router.get('/get-all', form.getAll);

module.exports = router;