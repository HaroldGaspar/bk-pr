const boom = require('@hapi/boom');
const config = require('../config');

//We Want that all errors in the app lead the BoomFormat
const wrapErrors = (err, req, res, next) => {
    if (!err.isBoom)
      next(boom.badImplementation(err));
    next(err);//se pasa el error con el statusCode
}

const errorHandler = (err, req, res, next) => {
  const {
    output: { statusCode, payload },
  } = err; //sacamos el output del error , ya q contiene los componenetes necesarios
  res.status(statusCode);//
  let stack = err.stack//.substr(0, err.stack.indexOf('\n'))
  //console.log(stack)
  res.json({payload, stack})
};

module.exports = {
    errorHandler,
    wrapErrors
}



//BOOM RETURN FORMAT
/*
"err": {
    "isBoom": true,
    "isServer": true,
    "data": null,
    "output": {
      "statusCode": 500,
      "payload": {
        "statusCode": 500,
        "error": "Internal Server Error",
        "message": "An internal server error occurred"
      },
      "headers": {}
    },
    "isDeveloperError": true
  }
*/