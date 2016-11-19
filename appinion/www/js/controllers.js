angular.module('app.controllers', [])

.controller('aPPINIONCtrl', ['$scope', '$stateParams', '$state', 'BlankFactory',
    function($scope, $stateParams, $state, BlankFactory) {

      var input = [];
      var tagCollection = [];


      $(function(){ // DOM ready

        // ::: TAGS BOX
        $("#tags input").on({
          focusout : function() {
            var txt = this.value.replace(/[^a-z0-9\+\-\.\#]/ig,''); // allowed characters

            if(txt) $("<span/>",{text:txt.toLowerCase(), insertBefore:this});
            this.value="";
          },
          keyup : function(ev) {
            // if: comma|enter (delimit more keyCodes with | pipe)

            if(/(188|13|32)/.test(ev.which)) {
              // tagCollection.push(this.value);
              console.log($(this));
              // console.log('collection - ' + tagCollection);
              // console.log('first element - ' + tagCollection[0]);
              $(this).focusout();
            }
            if(ev.which == '8') { $(this).prev().remove(); }
          }
        });
        $('#tags').on('click', 'span', function() {
          if(confirm("Remove "+ $(this).text() +"?")) $(this).remove();
        });

      });

        $scope.chartProvider = false;
        $scope.waarde = 90;

        var connectionURL = 'http://demo8089816.mockable.io/search';

        $scope.submit = function() {
            console.log('initial input = ' + $scope.input);
            input = $scope.input.split(" ");
            console.log('launching request with tags:' + input);
            BlankFactory.postFunction(connectionURL, $scope.input)
                .then(function(response) {
                    $scope.chartProvider = true;
                    $scope.waarde = response.rating;
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
            onCreate: '&',
            waarde: '='
        },
        link: function($scope, $element, $attr) {
            console.log('Scope', $scope);
            function initialize() {

                Morris.Donut({
                    element: 'donut-example',
                    data: [
                        { label: "Negative", value: $scope.waarde },
                        { label: "Positive", value: 100-$scope.waarde}
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
