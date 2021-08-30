const express = require('express');
const router = require('./src/router/router');
const app = express();

app.use(express.json());
app.use('/', router);

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
