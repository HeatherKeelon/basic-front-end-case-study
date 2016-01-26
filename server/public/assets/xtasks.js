caseStudyApp.controller('taskCtl', ['$scope', '$http', '$location', 'SelectionService', '$mdDialog', '$mdMedia', function($scope, $http, $location, SelectionService, $mdDialog, $mdMedia){

    $scope.selectionService = SelectionService;
    $scope.selectedUser = $scope.selectionService.getUser();
    $scope.userTasks = [];
    $scope.newTask = {};
    $scope.status = ' ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');


    $scope.getTasks = function(){
        var tasks = undefined;

        $http.get('http://jsonplaceholder.typicode.com/user/1/todos').then(function(response){
            tasks = (response.data);
            console.log(tasks);
            for(var i=0; i<tasks.length; i++){
                console.log(tasks[i]);
                if (tasks[i].userId == $scope.selectedUser){
                    $scope.userTasks.push(tasks[i]);
                }
            }
            console.log("This is userTasks ", $scope.userTasks);
        });
    };

    $scope.getTasks();


    $scope.addTask = function(ev){
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/views/newtask.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
            .then(function(answer){
                $scope.status = 'New task ' + answer +  ' submitted.';
            }, function(){
                $scope.status = 'You did  not add a task.';
            });
        $scope.$watch(function(){
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen){
            $scope.customFullscreen = (wantsFullScreen ===true);
        });
    };

    function DialogController($scope, $mdDialog){
        $scope.hide = function(){
            $mdDialog.hide();
        };
        $scope.cancel = function(){
            $mdDialog.cancel();
        };
        $scope.answer = function(answer){
            $mdDialog.hide(answer);
        };
    }

}]);