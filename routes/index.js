const router = require("express").Router();

router.use('/appointments', require('./appointment'));
router.use('/doctors', require('./doctor'));
router.use('/forms', require('./form'));
router.use('/presc', require('./presc'))
router.use('/observations', require('./observations'));
router.use('/profile', require('./profile'));

module.exports = router;