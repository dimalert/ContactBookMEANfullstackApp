'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/7labdatabase', function(err) {
    if(err) {
        console.log("Faild connecting to Mongodb!");
    } else {
        console.log("Succesfully conected to mongo!");
    }
});


