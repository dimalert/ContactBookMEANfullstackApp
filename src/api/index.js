'use strict';

var express = require("express");
var contacts =require( '../../public/mock/contacts.json');

var router = express.Router();

router.get("/contacts", function(req, res) {
    res.json({contacts: contacts});
});


module.exports = router;
