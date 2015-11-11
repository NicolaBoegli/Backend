;(function() {
    'use strict';

    /** The sampleapp application. **/
    var module = angular.module('sampleapp');

    module.controller('MainController', ['$scope', '$anchorScroll', 'shareService', function($scope, $anchorScroll, shareService) {

        shareService.setData('dis is data');

        $scope.main = 'main';
        $anchorScroll();
    }]);

}());


