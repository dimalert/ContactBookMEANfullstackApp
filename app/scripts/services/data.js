'use strict';

var angular = require('angular');

angular.module("contactsBook")
.service("dataService", function($http) {
    this.getContacts = function(cb) {
    $http.get('/api/contacts').then(cb);
  };
});