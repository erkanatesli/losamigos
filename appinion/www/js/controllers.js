angular.module('app.controllers', [])

.controller('aPPINIONCtrl', ['$scope', '$stateParams', '$state', 'BlankFactory',
    function($scope, $stateParams, $state, BlankFactory) {



        $scope.instantize = function() {
            setTimeout(function() {
                $('#tags').children('input')[0].focus();
                $("#aPPINION-button3")[0].disabled = true;
            });
        };

        var input = [];
        var tagCollection = [];
        $scope.popularKeywords = ['Trump', 'Iphone', 'Capgemini', 'Azure', 'Domino\s'];
        $scope.showPopularKW = true;

        $(function() { // DOM ready
            // ::: TAGS BOX
            $("#tags input").unbind().on({
                focusout: function() {
                    var txt = this.value.replace(/[^a-z0-9\+\-\.\#] /ig, ''); // allowed characters
                    txt = this.value.replace(/;|,/g, ''); // Not allowed characters
                    if (txt) $("<span/>", { text: txt, insertBefore: this });
                    $("#aPPINION-button3")[0].disabled = false;
                    this.value = "";
                },
                keydown: function(ev) {
                    // if backspace and this.value empty then remove previous tag
                    if (ev.which == '8' && this.value === '') { $(this).prev().remove(); }
                    if ($('#tags').children("span").length === 0) {
                      $("#aPPINION-button3")[0].disabled = true;
                    }
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
        $scope.startScreen = true;
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
            $scope.startScreen = false;
            setTimeout(function() {
                var inputArray = $('#tags').children("span");
                var parsedInput = [];
                console.log('inputArray = ' + inputArray);
                for (var i = 0; i < inputArray.length; i++) {
                    console.log('tag ' + i + ' = ' + inputArray[i].innerText);
                    parsedInput.push(inputArray[i].innerText);
                }
                // console.log('parsedInput = ' + parsedInput);
                BlankFactory.getAnalysis(parsedInput)
                    .then(function(response) {
                        console.log('Response: ', response);
                        $scope.data = response;
                        $scope.infoAvailable = true;
                        $scope.showPopularKW = false;
                        $scope.trust_value = Math.ceil((0.5 + (response.trust_value * 0.5)) * 100);
                        $scope.certainty = Math.ceil((0.5 + (response.certainty * 0.5)) * 100);



                        console.log('Percentage: ', $scope.trust_value, '%');
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
$scope.startScreen = true;
            $scope.showPopularKW = true;

        }
        $scope.setInput = function(word) {
          $scope.input = word;
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
                console.log('VALUE changed', val, $scope)
                console.log('Morris', morris);
                if (!morris) {
                    console.log('creating chart');
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
                } else {
                    // console.log('setting chart waarde');
                    morris.setData([{
                        label: "Negative",
                        value: 100 - parseInt(attrs.trust_value),
                        formatted: 100 - parseInt(attrs.trust_value) + '%'
                    }, {
                        label: "Positive",
                        value: parseInt(attrs.trust_value),
                        formatted: parseInt(attrs.trust_value) + '%'
                    }]);
                }
            });





        }
    }
})
