caseStudyApp.controller('profileCtl', ['$scope', '$http', '$location', 'SelectionService', function($scope, $http, $location, SelectionService){

    $scope.selectionService = SelectionService;
    $scope.userId = $scope.selectionService.getUser();
    $scope.userData = $scope.selectionService.getUserList();
    $scope.user;
    $scope.username;
    $scope.phonenumber;
    $scope.email;
    $scope.website;
    $scope.street;
    $scope.suite;
    $scope.city;
    $scope.company;
    $scope.bs;
    $scope.phrase;

    for(var i=0; i<$scope.userData.length; i++){
        if($scope.userData[i].id===$scope.userId){
            $scope.user = $scope.userData[i].name;
            $scope.username = $scope.userData[i].username;
            $scope.phonenumber = $scope.userData[i].phone;
            $scope.email = $scope.userData[i].email;
            $scope.website = $scope.userData[i].website;
            $scope.street = $scope.userData[i].address['street'];
            $scope.suite = $scope.userData[i].address['suite'];
            $scope.city = $scope.userData[i].address['city'];
            $scope.company = $scope.userData[i].company['name'];
            $scope.bs = $scope.userData[i].company['bs'];
            $scope.phrase = $scope.userData[i].company['catchPhrase'];
        }
    }
    //var latitude = $scope.userData[i].address['geo']['lat'];
    //var longitude = $scope.userData[i].address['geo']['lng'];












}]);