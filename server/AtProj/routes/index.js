var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    // console.log("hi");
    res.render('index.html');
});

module.exports = router;