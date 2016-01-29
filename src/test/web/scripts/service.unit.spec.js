;
(function () {

    'use strict';

    describe('HelloService', function () {

        beforeEach(angular.mock.module('sampleapp'));

        describe('service', function() {
            it('Is the service initialized?', inject(function (helloService) {
                expect(helloService).not.toBe(null);
            }));
        });

    });
}());