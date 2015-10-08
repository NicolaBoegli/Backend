;(function() {
    'use strict';

    /** The sampleapp application. **/
    var module = angular.module('sampleapp');

    module.controller('MainController', ['$scope', '$anchorScroll', function($scope, $anchorScroll) {
        $scope.main = 'main';
        $anchorScroll();
    }]);

}());


