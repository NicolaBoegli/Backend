;(function() {
    'use strict';

    /** dependencies list **/
    var dependencies = [
        'ngRoute'
    ];

    /** The sampleapp application. **/
    var app = angular.module('sampleapp', dependencies);

    app.config(['$routeProvider', function($routeProvider) {

        /** Routings **/
        var routes = [
            { path: '/', redirectTo: '/main' },
            { path: '/main', templateUrl: '/views/main/main.html', controller: 'MainController' },
            { path: '/hello', templateUrl: '/views/hello/hello.html', controller: 'HelloController' },
            { path: '/hello/create', templateUrl: '/views/hello/hello-create.html', controller: 'HelloCreateController' },
            { path: '/hello/:helloId', templateUrl: '/views/hello/hello-detail.html', controller: 'HelloDetailController' }

        ];

        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];

            if (route.redirectTo) {
                $routeProvider.when(route.path, { redirectTo: route.redirectTo });
            } else {
                $routeProvider.when(route.path, route);
            }
        }

        /** 404 **/
        $routeProvider.otherwise({ templateUrl: '/views/404.html' });
    }]);


}());