const express = require('express');
const router = express.Router();
const { loginUser, getProctud } = require('../controller/index');
const validateJwt = require('../middlewares/validateJwt');

router.post('/login', loginUser);
router.get('/products/:organizationName', validateJwt, getProctud);
router.get('/', (_req, res) => {
  res.status(404).json('Por favor faça login');
});

module.exports = router;
