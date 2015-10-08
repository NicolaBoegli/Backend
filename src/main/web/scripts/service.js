;(function() {
    'use strict';

    /** The sampleapp application. **/
    var module = angular.module('sampleapp');

    module.factory('helloService', ['$http', function($http) {

        var data = {};

        function getAll() {
            return $http.get('/api/hello').success(function (response) {
                data = response;
            }).error(function(error) {
                console.log(error);
            });
        }

        function findOne(id) {
            return $http.get('/api/hello/'+id).success(function (response) {
                data = response;
            }).error(function(error) {
                console.log(error);
            });
        }

        function persist(hello) {
            return $http.post('/api/hello', hello).success(function (response) {
                data = response;
            }).error(function(error) {
                console.log(error);
            });
        }

        function remove(id) {
            return $http.delete('/api/hello/'+id).success(function (response) {
                data = response;
            }).error(function(error) {
                console.log(error);
            });
        }

        function getData() {
            return data;
        }

        return {
            'getAll': getAll,
            'findOne': findOne,
            'persist': persist,
            'remove': remove,
            'getData': getData
        }
    }]);
})();