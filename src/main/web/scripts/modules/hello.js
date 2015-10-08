;(function () {
    'use strict';

    /** The sampleapp application. **/
    var module = angular.module('sampleapp');

    module.controller('HelloController', ['$scope', '$location', 'helloService', '$anchorScroll', function ($scope, $location, helloService, $anchorScroll) {
        $anchorScroll();

        helloService.getAll().then(function() {
            $scope.hellos = helloService.getData();
        });

        $scope.goToHello = function(id) {
            $location.path('/hello/' + id);
        };

        $scope.removeHello = function(id) {
            helloService.remove(id).then(function() {
                $scope.hellos = helloService.getData();
            });
        };
    }]);

    module.controller('HelloDetailController', ['$scope', '$location', 'helloService', '$routeParams', function ($scope, $location, helloService, $routeParams) {

        helloService.findOne($routeParams.helloId).then(function() {
            $scope.hello = helloService.getData();
        });

        $scope.removeHello = function(id) {
            helloService.remove(id).then(function() {
                $location.path('/hello');
            });
        }
    }]);

    module.controller('HelloCreateController', ['$scope', '$location', 'helloService', function ($scope, $location, helloService) {
        $scope.hello = {};

        $scope.createNewHello = function() {
            helloService.persist($scope.hello).then(function() {
               var data = helloService.getData();
                $location.path('/hello/'+ data.id);
            });
        };
    }]);


}());


