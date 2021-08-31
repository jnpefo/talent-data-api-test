require('dotenv').config();
const express = require('express');
const router = require('./src/router/router');
const app = express();
const error = require('./src/middlewares/error');

app.use(express.json());
app.use('/', router);

app.listen(process.env.PORT || 3000, () => console.log('ouvindo na porta 3000!'));

app.use(error);
