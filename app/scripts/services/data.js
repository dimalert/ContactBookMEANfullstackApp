'use strict';

var angular = require('angular');

angular.module("contactsBook")
.service("dataService", function($http, $q) {
    this.getContacts = function(cb) {
      $http.get('/api/contacts').then(cb);
    };
    
    this.saveContacts = function(contacts) {
      var queue = [];
      contacts.forEach(function(contact) {
        var request;
        if(!contact._id) {
          request = $http.post('/api/contacts', contact);
        } else {
          request = $http.put('/api/contacts/' + contact._id, contact).then(function(result) {
            contact = result.data.contact;
            return contact;
          });
        };
        queue.push(request);
      });
      return $q.all(queue).then(function(results) {
        console.log(`I saved ${contacts.length} contacts!`);
      });
    };
});