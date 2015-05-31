var express = require('express');
var router = express.Router();

/* GET home page. */
var hits=0
router.count=function(req, res, next) {
    res.send(200,{hits:hits})
};
router.registerNew=function(req, res, next) {
    hits++;
    res.send(200,{hits:hits});
};
module.exports = router;
