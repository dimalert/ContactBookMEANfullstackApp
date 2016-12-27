'use strict';

var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    name: String,
    address: String
});

var model = mongoose.model('Contact', contactSchema);

module.exports = model;