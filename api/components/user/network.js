//ONLY WORKS WITH THE NETLAYER SO FOR THE DATAACCESS REQUIRE A CONTROLLER
const express = require('express');

const response = require('../../../network/response');
const controller = require('./index')

const router = express.Router();

router.get('/', async function (req, res, next) {
        const lista = await controller.list()
        if(lista == null) throw Error('Not found data')
        response.success(req, res, lista, 200);
})


router.get('/:id', get);
router.post('/', upsert);
router.put('/', upsert);

async function get(req, res) {
    const user = await controller.get(req.params.id)
        // .then((user) => {
            //console.log(typeof req.params.id)//error in dummy
            response.success(req, res, user, 200);
        // }).catch((err) => {
        //     response.error(req, res, err.message, 500)})
    
}

async function upsert(req, res){//arrow function cannot access before initialization
    // try {
        const user = await controller.upsert(req.body)
        //console.log(user)      
        response.success(req, res, user, 201);
    // } catch (error) {
    //     response.error(req, res, error.stack, 500)}//stack was in body
}

module.exports = router;