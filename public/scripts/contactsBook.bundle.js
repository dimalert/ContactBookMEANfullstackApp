webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var angular = __webpack_require__(1);

	angular.module('contactsBook', []);

	__webpack_require__(3);
	__webpack_require__(4);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module("contactsBook")
	.controller("mainCtrl", function($scope, dataService) {

	    var changedContact = {'name': "", "address": ""};
	    $scope.isAddingMode = false;
	    $scope.isEdditingMode = false;

	    dataService.getContacts(function(response){
	        var contacts = response.data.contacts;  
	        $scope.contacts =  contacts;
	    });

	    $scope.index = 0;

	    $scope.dcrsIndex = () => --$scope.index;
	    $scope.incrsIndex = () => ++$scope.index;

	    $scope.addContact = function() {
	        $scope.isAddingMode = true;
	        $scope.contacts.push({"name": "", "address": ""});
	        $scope.index = $scope.contacts.length - 1;
	        $scope.contacts[$scope.index].edited = true;
	    };

	    $scope.edit = function() {
	        if($scope.contacts.length < 1) {
	            alert("There is no contacts in Contacts Book!");
	            return;
	        }
	        
	        $scope.isEdditingMode = true;
	        $scope.contacts[$scope.index].edited = true;
	        changedContact.name = $scope.contacts[$scope.index].name;
	        changedContact.address = $scope.contacts[$scope.index].address;
	    };

	    $scope.del = function() {
	        if($scope.contacts.length < 1) {
	            alert("There is no contacts in Contacts Book!");
	            return;
	        }
	        dataService.deleteTodo($scope.contacts[$scope.index]).then(function() {
	            $scope.contacts.splice($scope.index, 1);
	            $scope.index -= $scope.contacts.length === $scope.index ? 1 : 0;
	        });
	        
	    };

	    $scope.find = function() {
	        if($scope.contacts.length < 1) {
	            alert("There is no contacts in Contacts Book!");
	            return;
	        }

	        var str = prompt("Enter name to find contact in Contacts Book", "");
	        for(let i = 0; i < $scope.contacts.length; i++) {
	            if ($scope.contacts[i].name === str) {
	                $scope.index = i;
	                return;
	            }
	        }
	        alert("Contact with this name was not found.");
	    };

	    $scope.cancel = function() {
	        if($scope.isAddingMode === true) {
	            $scope.contacts.pop();
	            $scope.isAddingMode = false;
	            $scope.index = $scope.contacts.length - 1;
	            return;
	        }

	        $scope.contacts[$scope.index].name = changedContact.name;
	        $scope.contacts[$scope.index].address = changedContact.address;
	        $scope.isEdditingMode = false;
	        $scope.contacts[$scope.index].edited = false;
	    };

	    $scope.save = function() {
	        $scope.isAddingMode = false;
	        $scope.isEdditingMode = false;
	        var filteredContacts = $scope.contacts.filter( (contact) => {
	            if(contact.edited) {
	                return contact;
	            }
	        });
	        dataService.saveContacts(filteredContacts)
	        .finally($scope.resetContactState());
	    };

	    $scope.resetContactState = function() {
	        $scope.contacts.forEach(function(contact){
	            contact.edited = false;
	        });
	    };

	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

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

	    this.deleteTodo = function(contact) {
	        if (!contact._id) {
	          return $q.resolve();
	        }
	        return $http.delete('/api/contacts/' + contact._id).then(function() {
	          console.log(`I deleted the ${contact.name} contact!`);
	        });
	    };
	});

/***/ }
]);