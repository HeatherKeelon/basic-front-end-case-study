caseStudyApp.controller('taskCtl', ['$scope', '$http', '$location', 'SelectionService', '$mdDialog', '$mdMedia', function($scope, $http, $location, SelectionService, $mdDialog, $mdMedia){

    $scope.selectionService = SelectionService;
    $scope.selectedUser = $scope.selectionService.getUser();
    $scope.userTasks = [];
    $scope.newTask = {};
    //$scope.status = ' ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.missing = false;


    $scope.getTasks = function(){
        var tasks = undefined;

        $http.get('http://jsonplaceholder.typicode.com/user/1/todos').then(function(response){
            tasks = (response.data);

            for(var i=0; i<tasks.length; i++){
                if (tasks[i].userId == $scope.selectedUser){
                    $scope.userTasks.push(tasks[i]);
                }
            }
            if ($scope.userTasks[0] == undefined){
                $scope.missing = true;
            }
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
                var taskArray = [];
                var newId = undefined;
                for(var i=0; i<$scope.userTasks.length; i++){
                    taskArray.push($scope.userTasks[i].id);
                }

                if ($scope.userTasks[0] == undefined){
                    newId = 1;
                    $scope.missing = false;
                }else {
                    newId = Math.max.apply(null, taskArray) + 1;
                }

                $scope.newTask.userId = $scope.selectedUser;
                $scope.newTask.id = newId;
                $scope.newTask.title = answer;
                $scope.newTask.completed = false;

                $scope.userTasks.push($scope.newTask);
                $scope.newTask = {};
            }, function(){
                alert("You did not enter a task.");
            });
        $scope.$watch(function(){
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen){
            $scope.customFullscreen = (wantsFullScreen ===true);
        });
    };

    $scope.deleteTask = function(id){
        for(var i=0; i<$scope.userTasks.length; i++){
            if($scope.userTasks[i].id===id){
                $scope.userTasks.splice(i, 1);
                for(var i=0; i<$scope.userTasks.length; i++){
                    $scope.userTasks[i].id = i+1;
                }

            }
            if($scope.userTasks[0] == undefined){
                $scope.missing = true;
            }
        }
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