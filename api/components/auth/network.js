const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', async function(req, res,next) {
    const token = await Controller.login(req.body.username, req.body.password)
    //console.log('token', token)
    response.success(req, res, token, 200);
})

module.exports = router;