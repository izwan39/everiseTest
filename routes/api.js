var express = require('express');
var router = express.Router();
const got = require('got');
const { body, validationResult } = require("express-validator");

/* POST api. */
router.post('/', 
  [body("url").notEmpty().isURL().trim()], 
	validateRequest,
  async (req, res, next) => {
 
  //const url = 'http://the-internet.herokuapp.com/status_codes/500';
  const url = req.body.url;
  console.log('calling url '+url);
  try {
    const response = await got(url);
    const statusCode = response.statusCode;
    
    console.log(statusCode);
    res.json({status:true, message: statusCode});
  } catch (error) {
    var errorCode;
    if(error.response)
      errorCode = error.response.statusCode;
    else
      errorCode = error.code;

    console.log(errorCode);
    res.json({status:false, message: errorCode});
  }
});

function validateRequest(req, res, next) {
	const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
		return `${param}: ${msg}`;
	};
	const oValidationResult = validationResult(req).formatWith(errorFormatter);

	if (!oValidationResult.isEmpty()) {
		const resultToSend = {
			status: false,
			message: oValidationResult.array({ onlyFirstError: true }).join(", "),
		};
		res.send(resultToSend);
	} else {
		next();
	}
}

module.exports = router;
