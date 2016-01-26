var caseStudyApp = angular.module('caseStudyApp', ['ngRoute','ngMaterial','ngMessages', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.rowEdit', 'ui.grid.resizeColumns', 'ui.grid.moveColumns']);
console.log("app.js detected");

//Set up routing
caseStudyApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/users', {
            templateUrl: '/views/users.html',
            controller: 'userCtl'
        })

        .when('/tasks', {
            templateUrl: '/views/tasks.html',
            controller: 'taskCtl'
        })

        .when('/profile', {
            templateUrl: '/views/profile.html',
            controller: 'profileCtl'
        })

        .otherwise('users');
}]);

//filter for telephone number
caseStudyApp.filter('tel', function(){
    return function(tel){
        if (!tel){ return '';}

        var area;
        var city;
        var number;
        var longdist;

        switch(true){
            case tel.charAt(3) === '.' || tel.charAt(3) == '-':
                area = tel.slice(0,3);
                city = tel.slice(4,7);
                number = tel.slice(8);
                break;

            case tel.charAt(0) === '(':
                area = tel.slice(1,4);
                city = tel.slice(5,8);
                number = tel.slice(9);
                break;
            case tel.charAt(0) === '1':
                longdist = '1-';
                area = tel.slice(2,5);
                city = tel.slice(6,9);
                number = tel.slice(10);
                break;
            default:
                return tel;
        }

        if (longdist === undefined && area !== undefined){
            return ('(' + area + ') ' + city + '-' + number).trim();
        }else if (longdist === '1-') {
            return (longdist + '(' + area + ') ' + city + '-' + number).trim();
        }else {
            return tel;
        }

    };
});

