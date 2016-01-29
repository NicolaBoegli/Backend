;(function () {
    'use strict';

    /** The sampleapp application. **/
    var module = angular.module('sampleapp');

    module.controller('HelloController', ['$scope', '$location', 'helloService', '$anchorScroll', 'shareService', function ($scope, $location, helloService, $anchorScroll, shareService) {
        $anchorScroll();

        console.log(shareService.getData());

        helloService.getAll().then(function() {
            $scope.hellos = helloService.getData();
        });

        $scope.goToHello = function(id) {
            $location.path('/hello/' + id);
        };

        $scope.removeHello = function(id) {
            helloService.remove(id).then(function() {
                helloService.getAll().then(function() {
                    $scope.hellos = helloService.getData();
                });
            });
        };

        $scope.testFunction = function(id) {
            id = id + 2;
            return id;
        }
    }]);

    module.controller('HelloDetailController', ['$scope', '$location', 'helloService', '$routeParams', function ($scope, $location, helloService, $routeParams) {

        helloService.findOne($routeParams.helloId).then(function() {
            $scope.hello = helloService.getData();
        });

        $scope.removeHello = function(id) {
            helloService.remove(id).then(function() {
                $location.path('/hello');
            });
        };

        $scope.persistHello = function(hello) {
            helloService.persist(hello).then(function() {
                $location.path('/hello');
            });
        };
    }]);

    module.controller('HelloCreateController', ['$scope', '$location', 'helloService', function ($scope, $location, helloService) {
        $scope.hello = {};

        $scope.createNewHello = function() {
            helloService.persist($scope.hello).then(function() {
               var data = helloService.getData();
                $location.path('/hello/'+ data.id);
            });
        };

        $scope.backToList = function() {
            $location.path('/hello');
        };
    }]);


}());


