'use strict';

angular.module("contactsBook")
.service("dataService", function($http) {
    this.getContacts = function(cb) {
    $http.get('/mock/contacts.json').then(cb);
  };
});