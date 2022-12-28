const router = require("express").Router();

const diets = require('../controllers/diet-chart');

const { authorize } = require("../middleware/auth");

router.get('/get-all', authorize(), diets.getAll);
router.get('/latest-diets', authorize("patient"), diets.getLatest);
router.put('/deactivate/:id', authorize("admin"), diets.deactivate);
router.put('/activate/:id', authorize("admin"), diets.activate);

module.exports = router;