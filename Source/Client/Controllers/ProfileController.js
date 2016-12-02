angular.module('DaycareApp').controller('ProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];      
    $scope.Editing = false;  
    $scope.ShowModal = false;
    var modal = document.getElementById('myModal');
    var controllerFunction = $scope;

    $scope.backToList = function() {
        if($scope.Profile[0].EnrollmentStatus === 'W'){
            window.location.href = 'Waiting_list.html';
        } else {
            window.location.href = 'Children.html';
        }
    };


    $scope.LoadTempProfile = function() {
        $http.get('/getTempProfile')
        .then(function(response) {
            // alert("HTTP request set, getting data");
            // $scope.Children.push(response.data);
            $scope.Profile.push(response.data[0]);
        });
    };

    $scope.EditProfile = function(){
        $scope.Editing = !$scope.Editing
    };

    $scope.SaveChanges = function(){
        $scope.Profile[0].ChildName = ChildName.value;
        $scope.Profile[0].MaritalStatus = MaritalStatus.value;
        $scope.Profile[0].ChildAge = ChildAge.value;
        $scope.Profile[0].ChildBirthdate = ChildBirthdate.value;
        $scope.Profile[0].AgeGroup = AgeGroup.value;
        $scope.Profile[0].GuardianName1 = GuardianName1.value;
        $scope.Profile[0].GuardianStatus1 = GuardianStatus1.value;
        $scope.Profile[0].GuardianEmail1 = GuardianEmail1.value;
        $scope.Profile[0].GuardianPhone1 = GuardianPhone1.value;
        $scope.Profile[0].GuardianName2 = GuardianName2.value;
        $scope.Profile[0].GuardianStatus2 = GuardianStatus2.value;
        $scope.Profile[0].GuardianEmail2 = GuardianEmail2.value;
        $scope.Profile[0].GuardianPhone2 = GuardianPhone2.value;

        var updates = $scope.Profile;
        $http.post('/test', updates)
        .then(function(response) {
            console.log("Success");
            // window.location.href = 'Waiting_list.html';            
        });


        $scope.Editing = false;  
    };

    // $scope.Monday = function( time ){
    //     if(time < $scope.Profile[0].MondayIn){
    //         "N/A"
    //     }
    //     else if(time > $scope.Profile[0].MondayOut){
    //         "N/A"
    //     }
    //     else{
    //         "X"
    //     }
    // }

    $scope.acceptChild = function(ID){
        var sendID = [];
        sendID.push(ID);
        $http.post('/acceptChild', sendID)
        .then(function(response) {
            // var acceptedChild = [];
            alert("Child has been accepted into the program!");
            $scope.CloseModal();
        });
    };


    /* MODAL JUNK */

    $scope.OpenModal = function() {
        $scope.ShowModal = true;
    }

    $scope.CloseModal = function() {
        $scope.ShowModal = false;
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {  
        if (event.target == modal) {
            // $scope.ShowModal = false;
            controllerFunction.CloseModal();
        }
        controllerFunction.$apply(); // This makes it so the page "sees" that we changed the variable.
    }

}]);