angular.module('app.services', [])

.factory('BlankFactory', ['$http', '$q', '$ionicLoading', function($http, $q, $ionicLoading) {

    function postFunction(url, parameters) {
        console.log('postFunction', parameters);

        var postData = {
            parameters: parameters
        };

        var deferred = $q.defer();
        $ionicLoading.show();

        $http({
                url: url,
                data: postData,
                method: "POST",
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
        postFunction: postFunction
    };

}])

.service('BlankService', [function() {

}]);
