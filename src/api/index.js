'use strict';

var express = require("express");

var router = express.Router();

router.get("/phoneBook", function(req, res) {
    res.send("This is the todos!");
});


module.exports = router;
