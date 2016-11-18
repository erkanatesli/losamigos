angular.module('app.controllers', [])

.controller('aPPINIONCtrl', ['$scope', '$stateParams', '$state', 'BlankFactory',
    function($scope, $stateParams, $state, BlankFactory) {

        $scope.chartProvider = false;
        $scope.input = '';
        
        var connectionURL = 'http://demo8089816.mockable.io/search';

        $scope.submit = function() {
            console.log('launching request...');

            BlankFactory.postFunction(connectionURL, $scope.input)
                .then(function(response) {
                    $scope.chartProvider = true;
                    console.log('response', response);
                });
        }

    }
])

.directive('appiniondonut', function() {
    // var toDestroy = angular.element(document.querySelector('#chartjs'));
    // toDestroy.remove();
    console.info('directive appiniondonut');
    return {
        restrict: 'E',
        scope: {
            onCreate: '&'
        },
        link: function($scope, $element, $attr) {

            function initialize() {

                Morris.Donut({
                    element: 'donut-example',
                    data: [
                        { label: "Negative", value: 80 },
                        { label: "Positive", value: 20 }
                    ],
                    colors: [
                        'tomato',
                        '#39B580',
                        'wheat'
                    ],
                    resize: true
                });
            } // end fn initialize

            if (document.readyState === "complete") {
                console.log('initialize');
                initialize();
            } else {
                initialize(); // had to force start it :(
                console.info('event.addDomListener');
                // Morris.Donut.event.addDomListener(window, 'load', initialize);
            }
        }
    }
})
