caseStudyApp.service('SelectionService', ['$http', function($http){
    var user = undefined;
    var userlist = [];

    return {
        getUser: function(){
            return user;
        },

        setUser: function(userId){
            user = userId;
            return user;
        },

        setUserList: function(){
                $http.get('http://jsonplaceholder.typicode.com/users').then(function(response){
                    userlist = response.data;
                    return userlist;
                });
            },

        getUserList: function(){
            return userlist;
        }


    };
}]);