angular.module('app.controllers', [])

.controller('aPPINIONCtrl', ['$scope', '$stateParams', '$state', 'BlankFactory',
    function($scope, $stateParams, $state, BlankFactory) {

      var input = [];
      var tagCollection = [];

      $(function(){ // DOM ready
        // ::: TAGS BOX
        $("#tags input").unbind().on({
          focusout : function() {
            var txt = this.value.replace(/[^a-z0-9\+\-\.\#]/ig,''); // allowed characters
            if(txt) $("<span/>",{text:txt.toLowerCase(), insertBefore:this});
            this.value="";
          },
          keydown: function(ev) {
            // if backspace and this.value empty then remove previous tag
            if (ev.which == '8' && this.value === '') { $(this).prev().remove(); }
          },
          keyup: function(ev) {
            // if space|semi-colon|komma add tag start new
            if (ev.which == '32' || ev.which == '186' || ev.which == '188') { $(this).focusout(); }
          }
        });
        $('#tags').unbind().on({
          click : function() {
              console.log($(this));
              // $(this)[0].remove();
            }
          })
        });

        $scope.chartProvider = false;
        $scope.waarde = 90;

        var connectionURL = 'http://demo8089816.mockable.io/search';

        $scope.submit = function() {
            var inputArray = $('#tags').children("span");
            var parsedInput = [];
            console.log('inputArray = ' + inputArray);
            for (var i = 0; i < inputArray.length; i++) {
              console.log('tag ' + i + ' = ' + inputArray[i].innerText);
              parsedInput.push(inputArray[i].innerText);
            }
            console.log('parsedInput = ' + parsedInput);

            BlankFactory.postFunction(connectionURL, parsedInput)
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
