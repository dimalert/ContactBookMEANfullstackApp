'use strict';

var ContactsBook = require('./models/contactsBook.js');

var contacts = [
    'Kirill',
    'David',
    'Artem'
];

contacts.forEach(function(contact, index) {
    ContactsBook.find({'name': contact}, function(err, contacts) {
        if(!err && !contacts.length) {
            ContactsBook.create({name: contact, address: "Street/ house/ country"});
        }
    });
});