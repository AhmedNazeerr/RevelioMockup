const express = require('express');
const router = express.Router();
const {
  authenticateUser,
} = require('../middleware/authentication');
const {
  showCurrentUser,
} = require('../controllers/UserController');

router.route('/showMe').get(authenticateUser, showCurrentUser);
module.exports = router;
