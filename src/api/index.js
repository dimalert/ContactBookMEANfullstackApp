'use strict';

var express = require("express");
var ContactsBook = require('../models/contactsBook');
//var contacts =require( '../../public/mock/contacts.json');

var router = express.Router();

router.get("/contacts", function(req, res) {
    ContactsBook.find({}, function(err, contacts) {
        if(err) {
            return res.status(500).json({message: err.message});
        }
        res.json({contacts: contacts});
    });
});

router.post('/contacts', function(req, res) {
    var contact = req.body;
    ContactsBook.create(contact, function(err, contact) {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.json({'contact': contact, message: "Contact created!"});    
    });
});

router.put('/contacts/:id', function(req, res) {
    var id = req.params.id;
    var contact = req.body;
    if(contact && contact._id !== id) {
        return res.status(500).json({err: "Ids don't match!"});
    }
    ContactsBook.findByIdAndUpdate(id, contact, {new: true}, function(err, contact) {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.json({'contact': contact, message: "Contact updated!"});    
    });
});

router.delete('/contacts/:id', function(req, res) {
  var id = req.params.id;
  ContactsBook.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Contact  Deleted' });
  });
});

module.exports = router;
