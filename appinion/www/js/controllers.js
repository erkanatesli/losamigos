angular.module('app.controllers', [])

.controller('aPPINIONCtrl', ['$scope', '$stateParams', '$state', 'BlankFactory',
    function($scope, $stateParams, $state, BlankFactory) {

        $scope.instantize = function() {
            setTimeout(function() {
                $('#tags').children('input')[0].focus();
            });
        };

        var input = [];
        var tagCollection = [];

        $(function() { // DOM ready
            // ::: TAGS BOX
            $("#tags input").unbind().on({
                focusout: function() {
                    var txt = this.value.replace(/[^a-z0-9\+\-\.\#] /ig, ''); // allowed characters
                    txt = this.value.replace(/;|,/g, ''); // Not allowed characters
                    if (txt) $("<span/>", { text: txt, insertBefore: this });
                    this.value = "";
                },
                keydown: function(ev) {
                    // if backspace and this.value empty then remove previous tag
                    if (ev.which == '8' && this.value === '') { $(this).prev().remove(); }
                },
                keyup: function(ev) {
                    // if enter|semi-colon|komma add tag start new
                    if (ev.which == '13' || ev.which == '186' || ev.which == '188') {
                        $(this).focusout();
                    }
                }
            });
            $('#tags').unbind().on({
                click: function() {
                    console.log($(this));
                    // $(this)[0].remove();
                }
            });
        });

        $scope.chartProvider = false;
        $scope.waarde = 90;


        $scope.submit = function() {
            var inputArray = $('#tags').children("span");
            var parsedInput = [];
            console.log('inputArray = ' + inputArray);
            console.log('length = ' + inputArray.length);

            for (var i = 0; i < inputArray.length; i++) {
                console.log('tag ' + i + ' = ' + inputArray[i].innerText);
                parsedInput.push(inputArray[i].innerText);
            }
            // console.log('parsedInput = ' + parsedInput);

            BlankFactory.getAnalysis(parsedInput)
                .then(function(response) {
                    console.log('response', response);

                    $scope.chartProvider = true;

                    $scope.waarde = Math.ceil((0.5 + (response.trust_value * 0.5)) * 100);
                    
                    console.log('Percentage: ', $scope.waarde, '%');
                });
        }

        $scope.newSearch = function() {
            $('#tags').children('span').remove();
            console.log($('#tags'));
            setTimeout(function() {
                $('#tags').children('input')[0].focus();
            });

            $scope.chartProvider = false;

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
                    element: 'donut-appinion',
                    data: [
                        { label: "Negative", value: 100 - $scope.waarde, formatted: 100 - $scope.waarde + '%' },
                        { label: "Positive", value: $scope.waarde, formatted: $scope.waarde + '%' }
                    ],
                    formatter: function(x, data) {
                        return data.formatted; 
                    },
                    labelColor: '#387ef5',
                    colors: [
                        'red',
                        '#39B580'
                    ],
                    resize: true
                }).on('click', function(i, row) {
                    console.log(i, row);
                });
            }


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
