angular.module('app.services', [])

.factory('BlankFactory', ['$http', '$q', '$ionicLoading', function($http, $q, $ionicLoading) {

    function getAnalysis(parameters) {
        console.log('getAnalysis', parameters);
        // var url = 'http://demo8089816.mockable.io/search';
        var url = 'http://nadiahagen.nl/appinion-service/public/api/v1/search?query=' + parameters + '&debug=1' + "&mts=10";
        console.log('URL:', url);
        // var postData = {
        //     parameters: parameters
        // };

        var deferred = $q.defer();
        $ionicLoading.show({
          template: 'Looking for sources...'
        });

        $http({
                url: url,
                // data: postData,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function(data) {
                $ionicLoading.hide();
                deferred.resolve(data);
            })
            .error(function(data) {
                $ionicLoading.hide();
                deferred.reject(data);
            });
        return deferred.promise;
    }

    return {
        getAnalysis: getAnalysis
    };

}])

.service('BlankService', [function() {

}]);
