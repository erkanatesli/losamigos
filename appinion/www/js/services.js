angular.module('app.services', [])

.factory('BlankFactory', ['$http', '$q', '$ionicLoading', function($http, $q, $ionicLoading){

  function postFunction(input) {
    var link = 'http://demo8089816.mockable.io/search';
    $ionicLoading.show({
      duration: 3000,
      noBackdrop: true,
      template: 'Loading...'
    });

    $http.post(link, {searchInput: input}).then(function (res) {
      $ionicLoading.hide();
      console.log('post succeeded');
    });
  }

  return {
    postFunction: postFunction
  };

}])

.service('BlankService', [function(){

}]);
