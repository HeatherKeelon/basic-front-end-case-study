caseStudyApp.controller('userCtl', ['$scope', '$http', '$location', 'SelectionService', function($scope, $http, $location, SelectionService){
    console.log("You are in user controller");

    //set variables
    $scope.users = [];
    $scope.selectedUser;
    $scope.selectionService = SelectionService;

    $scope.hideGrid = true;

    $scope.getUsers = function(){
        $http.get('http://jsonplaceholder.typicode.com/users').then(function(response){
            $scope.gridOptions.data = response.data;
            console.log("This is users", $scope.gridOptions.data);
            $scope.hideGrid = false;

        });
    };


    $scope.getUsers();
    console.log("These are the users ", $scope.users);

    //set grid
    var nameTemplate = '<div class="ui-grid-cell-contents select-name" ng-click="grid.appScope.selectUser(row.entity.id)">{{row.entity.name}}';

        $scope.gridOptions = {
            enableSorting: true,
            rowEditWaitInterval: 500,

            columnDefs: [
                {name: 'id', field: 'id', enableCellEdit: false},
                {name: 'Name', field: 'name', enableCellEdit: false, cellTemplate: nameTemplate},
                {name: 'Username', field: 'username', enableCellEdit: false},
                {name: 'Phone', field: 'phone', enableCellEdit: false, cellFilter: 'tel'},
                {name: 'Company', field: 'company.name', enableCellEdit: false}
            ]

        };

    $scope.selectUser = function(id){
        $scope.selectedUser = id;
        $scope.selectionService.setUser(id);
        console.log("Selected User ", $scope.selectionService.getUser());
        $location.path('/tasks');
    };


}]);

