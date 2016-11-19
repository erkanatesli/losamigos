angular.module('app.services', [])

.factory('BlankFactory', ['$http', '$q', '$ionicLoading', function($http, $q, $ionicLoading) {

    function getAnalysis(parameters) {
        console.log('getAnalysis', parameters);
        var url = 'http://node7.codenvy.io:37728/appinion-service/public/api/v1/search?query='  + parameters;
        console.log('URL:', url);
        // var postData = {
        //     parameters: parameters
        // };

        var deferred = $q.defer();
        $ionicLoading.show();

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
