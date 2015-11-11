;(function () {
    'use strict';

    var module = angular.module('sampleapp');

    /*
     * Mark Active Navigation Point Directive
     * */
    module.directive('activeStartswith', ['$location', function ($location) {
        function updateElement(element, scope) {
            element.removeClass('active');
            var patterns = scope.activeStartswith.split('|');
            for (var i = 0; i < patterns.length; i++) {
                var pattern = patterns[i];
                if ($location.path().indexOf(pattern) === 0) {
                    element.addClass('active');
                }
            }
        }

        return {
            restrict: 'A',
            scope: {
                activeStartswith: '='
            },
            link: function (scope, element) {
                updateElement(element, scope);
                scope.$on('$routeChangeSuccess', function () {
                    updateElement(element, scope);
                });
            }
        };
    }]);

    //A directive which controls my front-page div
    module.directive('frontPageControl', ['$location', '$window', '$interval', function ($location, $window, $interval) {
        //get initial height - navbar
        function setElementHeight() {
            $('#title-container').css('height', $(window).outerHeight(true) - 50);
        }

        //Display none #title-container
        function displayNone() {
            $('#title-container').css('display', 'none');
        }

        //Display block #title-container
        function displayBlock() {
            $('#title-container').css('display', 'block');
        }

        //Centers #front-page
        function calcContentPosition() {
            var viewport = $(window).outerHeight(true);
            var frontPage = $('#front-page');
            var diff = viewport - frontPage.outerHeight(true);
            frontPage.css('margin-top', diff / 2);
        }

        function callAllFunctions() {
            setElementHeight();
            calcContentPosition();
        }

        function checkIfOnMain(fn) {
            var viewportWidth = $(document).outerWidth(true);

            //Check if on /main location
            if ($location.path() !== '/main') {
                displayNone();
            } else {
                //If its a phone hide the frontpage
                if (viewportWidth < 768) {
                    displayNone();
                } else {
                    displayBlock();
                }
            }
            fn();
        }

        function decorateFunctionCall(fn1, interval, fn2) {
            $interval(function () {
                if (fn2) {
                    fn1(fn2);
                } else {
                    fn1();
                }
            }, interval, 4);
        }

        return {
            restrict: 'E',
            templateUrl: 'views/directiveTemplates/front-page.html',
            link: function (scope) {
                var window = angular.element($window);

                //angular resize event
                window.bind('resize', function () {
                    decorateFunctionCall(checkIfOnMain, 1, callAllFunctions);
                });

                //angular scroll event
                angular.element($window).bind('scroll', function () {
                    callAllFunctions();
                });

                //On routeChangeSuccess remove/add needed classes
                scope.$on('$routeChangeSuccess', function () {
                    decorateFunctionCall(checkIfOnMain, 1, callAllFunctions);
                });

                //cast when view is fully loaded
                scope.$on('$viewContentLoaded', function () {
                    callAllFunctions();
                });

                $(document).ready(function () {
                    callAllFunctions();
                });
            }
        };
    }]);

    //A directive which controls my navbar
    module.directive('navbarControl', ['$location', '$window', '$interval', function ($location, $window, $interval) {
        var scrolledOut = false;
        var scrollTop = 0;

        //Places navbar on the bottom of the page / for main page only
        function placeNavbarBottom() {
            var viewportheight = $(window).outerHeight(true);
            var titleContainer = $('#title-container').outerHeight(true);

            var diff = viewportheight - titleContainer;

            $('#navigation').css('margin-top', diff - 50);
        }

        //Fixes and defixes the navbar
        function fixNavbarTop() {
            var titleContainer = $('#title-container');
            var titleContainerHeight = titleContainer.outerHeight(true);
            var navbar = $('#navigation');
            scrollTop = titleContainerHeight;

            //Check if nav is in viewport
            if (titleContainerHeight + 50 < $(window).scrollTop()) {
                scrolledOut = true;
            } else {
                scrolledOut = false;
            }

            //Save scrolled out pos and fix navbar
            if ($(window).scrollTop() > (navbar.offset().top + navbar.height() - 50)) {
                addFixedClass();
                addNavbarStyle();
            }

            //Remove fixed if nav is at saved pos (scrollTop)
            if (scrolledOut === true) {
                addFixedClass();
                addNavbarStyle();
            } else {
                if ($(window).scrollTop() < scrollTop) {
                    if (titleContainer.css('display') === 'block') {
                        removeFixedClass();
                        removeNavbarStyle();
                    }
                }
            }
        }

        //Adds a class which does a position fixed
        function addFixedClass() {
            $('#navigation').addClass('fix-navbar');
            $('.page-header').css('margin-top', 80);
        }

        //adds a class which does a position fixed
        function removeFixedClass() {
            $('#navigation').removeClass('fix-navbar');
            $('.page-header').css('margin-top', 30);
        }

        //added for changing color
        function addNavbarStyle() {
            $('#styling-nav').addClass('fix-navbar-style');
        }

        //added for changing color back to normal
        function removeNavbarStyle() {
            $('#styling-nav').removeClass('fix-navbar-style');
        }

        //placeNavbarBottom and FixNavbarTop are called too much times. easier to just call 1 function
        function callAllFunctions() {
            //No need to make if it isn't /main
            if ($location.path() === '/main') {
                placeNavbarBottom();
                fixNavbarTop();
            }
        }

        function decorateFunctionCall(fn, interval) {
            $interval(function () {
                fn();
            }, interval, 1);
        }

        return {
            restrict: 'E',
            templateUrl: 'views/directiveTemplates/navigation.html',
            scope: {},
            link: function (scope) {
                //get window
                var window = angular.element($window);

                //angular resize event
                window.bind('resize', function () {
                    decorateFunctionCall(callAllFunctions, 1);
                });

                //angular scroll event
                angular.element($window).bind('scroll', function () {
                    callAllFunctions();
                });

                //On routeChangeSuccess remove/add needed classes
                scope.$on('$routeChangeSuccess', function () {
                    if ($location.path() !== '/main') {
                        addFixedClass();
                        removeNavbarStyle();
                    } else {
                        removeFixedClass();
                    }
                    decorateFunctionCall(callAllFunctions, 1);
                });

                //cast when view is fully loaded
                scope.$on('$viewContentLoaded', function () {
                    callAllFunctions();
                });

                callAllFunctions();
            }
        };
    }]);

    //Footer directive for controller the footer
    module.directive('footerControl', ['$location', '$window', '$interval', function ($location, $window, $interval) {
        //Adds a class which colors the footer green for the main page
        function addFooterClass() {
            $('#bottom-navigation').addClass('bottom-nav');
            $('.footer-container').addClass('footer-color');
        }

        //removes a class which colors the footer green for the main page
        function removeFooterClass() {
            $('#bottom-navigation').removeClass('bottom-nav');
            $('.footer-container').removeClass('footer-color');
        }

        //Calculates viewportheight and places footer accordingly
        function placeFooterBottom() {
            var viewportheight = $(window).height();

            //decrease value to -50 if you want to see the whole navbar
            $('.basic-container').css('min-height', viewportheight - 10);
        }

        //Set Correct height of Footer items or remove if too small
        function adjustFooterDesign() {
            var footer = $('.footer-container');
            var mainContainer = $('.footer-main-container');
            var infoContainer = $('.footer-info-container');
            var viewportWidth = $(document).outerWidth(true);

            //bigger than phones
            if (viewportWidth > 992) {
                mainContainer.css('height', footer.height());
                infoContainer.css('height', footer.height());
                infoContainer.css('display', 'block');
            } else {
                infoContainer.css('display', 'none');
            }
        }

        //Capsule all functions
        function callAllFunctions() {
            if ($location.path() !== '/main') {
                removeFooterClass();

            } else {
                addFooterClass();
            }
            placeFooterBottom();
            adjustFooterDesign();
        }

        function decorateFunctionCall(fn, interval) {
            $interval(function () {
                fn();
            }, interval, 4);
        }

        return {
            restrict: 'E',
            templateUrl: 'views/directiveTemplates/footer.html',
            scope: {},
            link: function (scope) {
                //get window
                var window = angular.element($window);

                //angular resize event
                window.bind('resize', function () {
                    decorateFunctionCall(callAllFunctions, 1);
                });

                //angular scroll event
                angular.element($window).bind('scroll', function () {
                    callAllFunctions();
                });

                //Stuff to do on routeChanceSuccess
                scope.$on('$routeChangeSuccess', function () {
                    decorateFunctionCall(callAllFunctions, 1);
                });

                //cast when view is fully loaded
                scope.$on('$viewContentLoaded', function () {
                    callAllFunctions();
                });

                callAllFunctions();
            }
        };
    }]);
}());