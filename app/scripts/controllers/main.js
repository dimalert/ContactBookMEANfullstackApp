'use strict';

var angular = require('angular');

angular.module("contactsBook")
.controller("mainCtrl", function($scope, dataService) {

    var changedContact = {'name': "", "address": ""};
    $scope.isAddingMode = false;
    $scope.isEdditingMode = false;

    dataService.getContacts(function(response){
        var contacts = response.data.contacts;  
        $scope.contacts =  contacts;
        sort();
    });

    function sort() {
        $scope.contacts.sort((a, b) => {
            return a.name > b.name;
        });
        $scope.setContactState();
    }

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
        sort();
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

    $scope.setContactState = function() {
        $scope.contacts.forEach(function(contact){
            contact.edited = true;
        });
    };

});