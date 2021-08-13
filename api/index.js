const express = require('express');

const {api} = require('../config');
const user = require('./components/user/network');

const app = express();

// ROUER
app.use('/api/user', user);

app.listen(api.port, () => {
    console.log('Api escuchando en el puerto ', api.port);
});