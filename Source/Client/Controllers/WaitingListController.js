    angular.module('DaycareApp').controller('WaitingListController', ['$scope', '$http', function($scope, $http){
        
        $scope.RefreshDatabase = function() {
            $http.get('/RefreshDatabase')
            .then(function(response) {
                alert("An HTTP request has been sent to the server.\nNow updating DaycareDB.db!");
            });
        };


    }]);