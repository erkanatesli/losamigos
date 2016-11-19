angular.module('app.services', [])

.factory('BlankFactory', ['$http', '$q', '$ionicLoading', function($http, $q, $ionicLoading) {

    function getAnalysis(parameters) {
        console.log('getAnalysis', parameters);
        var url = 'http://demo8089816.mockable.io/search';
        // var url = 'http://node2.codenvy.io:37975/appinion-service/public/api/v1/search?query=' + parameters + '&debug=1';
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
