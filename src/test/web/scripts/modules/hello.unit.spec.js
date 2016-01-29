;
(function () {

    'use strict';

    describe('HelloController', function () {

        beforeEach(module('sampleapp'));

        var $controller;

        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
        }));

        describe('Controller test', function () {
            it('first test passed', function () {

                var $scope = {};
                var controller = $controller('HelloController', {$scope: $scope});

                var test = $scope.testFunction(2);
                expect(test).toEqual(4);
            });
        });
    });
}());