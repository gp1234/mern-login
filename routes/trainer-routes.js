const express = require('express');
const trainerController = require('../controllers/trainer-controller');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/', auth, trainerController.profile);


module.exports = router;