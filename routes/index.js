var express = require('express');
var router = express.Router();
const got = require('got');

/* GET/POST home page. */
router.all('/', async function(req, res, next) {
  let result;
  if(Object.keys(req.body).length > 0) {
    const {body} = await got.post('http://localhost:3000/api', {json: req.body, responseType:'json'});
    console.log(body);
    result = JSON.stringify(body);
  }
  res.render('index', { title: 'Express', result: result });
});

module.exports = router;
