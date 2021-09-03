const express = require('express');
const router = express.Router();
const { loginUser, getProctud } = require('../controller/index');
const validateJwt = require('../middlewares/validateJwt');

router.post('/login', loginUser);
router.get('/products/:organizationName', validateJwt, getProctud);

module.exports = router;
