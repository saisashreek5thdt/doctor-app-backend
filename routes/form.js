const router = require("express").Router();

const form = require('../controllers/form');

router.get('/get-all', form.getAll);

module.exports = router;