angular.module('app.controllers', [])

.controller('aPPINIONCtrl', ['$scope', '$http', '$stateParams', '$ionicLoading', 'BlankFactory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, $ionicLoading, BlankFactory) {
  var vm = this;

  vm.searchOpinions = function(input) {
    console.log('init search');

    console.log($scope.input);
  };

  $scope.submit = function(){
    console.log('launching request...');
    BlankFactory.postFunction($scope.input);
  }

}]);
