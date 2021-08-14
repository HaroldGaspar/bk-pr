const express = require('express');
const app = express();
//comp
const {api} = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
//err
const { errorHandler, wrapErrors } = require('../middleware/errorHandler');
require('express-async-errors')

app.use(express.json())

// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth)

//Middleware
app.use(wrapErrors)
app.use(errorHandler)


app.listen(api.port, () => {
    console.log('Api escuchando en el puerto ', api.port);
});

