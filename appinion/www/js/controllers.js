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

        $scope.infoAvailable = false;

        window.Morris.Donut.prototype.setData = function(data, redraw) {
            if (redraw == null) {
                redraw = true;
            }
            this.data = data;
            this.values = (function() {
                var _i, _len, _ref, _results;
                _ref = this.data;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    row = _ref[_i];
                    _results.push(parseFloat(row.value));
                }
                return _results;
            }).call(this);
            this.dirty = true;
            if (redraw) {
                return this.redraw();
            }
        }


        $scope.submit = function() {
            setTimeout(function() {
                var inputArray = $('#tags').children("span");
                var parsedInput = [];
                console.log('inputArray = ' + inputArray);
                for (var i = 0; i < inputArray.length; i++) {
                    console.log('tag ' + i + ' = ' + inputArray[i].innerText);
                    parsedInput.push(inputArray[i].innerText);
                }
                console.log('parsedInput = ' + parsedInput);
                BlankFactory.getAnalysis(parsedInput)
                    .then(function(response) {
                        console.log('response', response);

                        $scope.infoAvailable = true;
                        $scope.waarde = Math.ceil((0.5 + (response.trust_value * 0.5)) * 100);
                        $scope.data = response;


                        console.log('Percentage: ', $scope.waarde, '%');
                    });
            }, 100);
        };

        $scope.newSearch = function() {
            $('#tags').children('span').remove();
            console.log($('#tags'));
            setTimeout(function() {
                $('#tags').children('input')[0].focus();
            });

            $scope.infoAvailable = false;

        }

    }
])

.directive('appiniondonut', function($window) {
    // var toDestroy = angular.element(document.querySelector('#chartjs'));
    // toDestroy.remove();
    // console.info('directive appiniondonut');
    return {
        restrict: 'E',
        replace: true,
        link: function($scope, $element, attrs) {
            console.log('link directive', $scope);

            var morris;
            angular.element($window).bind('resize', function() {
                if (morris) {
                    // console.log('morris resized');
                    morris.redraw();
                }
            });

            attrs.$observe('value', function(val) {
                // console.log('VALUE changed', val, $scope)
                // console.log('Morris', morris);
                if (!morris) {
                    console.log('creating chart');

                    if (document.readyState === "complete") {

                        // console.log('initialize');
                        initialize();
                    } else {
                        initialize(); // had to force start it :(
                        // console.info('event.addDomListener');
                        // Morris.Donut.event.addDomListener(window, 'load', initialize);
                    }

                } else {
                    // console.log('setting chart waarde');
                    morris.setData([
                        { label: "Negative", value: 100 - parseInt(attrs.value), formatted: 100 - parseInt(attrs.value) + '%' },
                        { label: "Positive", value: parseInt(attrs.value), formatted: parseInt(attrs.value) + '%' }
                    ]);
                }
            });

            function initialize() {
                console.log('Atrrs', attrs);
                morris = Morris.Donut({
                    element: 'donut-appinion',
                    data: [
                        { label: "Negative", value: 100 - parseInt(attrs.value), formatted: 100 - parseInt(attrs.value) + '%' },
                        { label: "Positive", value: parseInt(attrs.value), formatted: parseInt(attrs.value) + '%' }
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


        }
    }
})
