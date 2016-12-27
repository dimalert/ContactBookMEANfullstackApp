'use strict';

angular.module("contactsBook")
.controller("mainCtrl", function($scope, dataService) {

    var changedContact = {'name': "", "address": ""};
    $scope.isAddingMode = false;
    $scope.isEdditingMode = false;

    dataService.getContacts(function(response){
        var contacts = response.data;  
        $scope.contacts =  contacts;
    });

    $scope.index = 0;

    $scope.dcrsIndex = () => --$scope.index;
    $scope.incrsIndex = () => ++$scope.index;

    $scope.addContact = function() {
        $scope.isAddingMode = true;
        $scope.contacts.push({"name": "", "address": ""});
        $scope.index = $scope.contacts.length - 1;
    };

    $scope.edit = function() {
        if($scope.contacts.length < 1) {
            alert("There is no contacts in Contacts Book!");
            return;
        }
        
        $scope.isEdditingMode = true;
        changedContact.name = $scope.contacts[$scope.index].name;
        changedContact.address = $scope.contacts[$scope.index].address;
    };

    $scope.del = function() {
        if($scope.contacts.length < 1) {
            alert("There is no contacts in Contacts Book!");
            return;
        }

        $scope.contacts.splice($scope.index, 1);
        $scope.index -= $scope.contacts.length === $scope.index ? 1 : 0;
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
    };

    $scope.save = function() {
        $scope.isAddingMode = false;
        $scope.isEdditingMode = false;
    };

});