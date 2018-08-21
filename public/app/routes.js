var app = angular.module("routeapp",["ngRoute"]);

app.config(function($routeProvider,$locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "app/views/pages/home.hbs"
        })
        .when("/signup", {
            templateUrl : "app/views/pages/signup.hbs",
            controller: "myCtrl",
            controllerAs: "myCtrl"
        })
        .when("/login", {
            templateUrl : "app/views/pages/login.hbs",
            controller: "myCtrl",
            controllerAs: "myCtrl"
        })
        .when("/profile", {
            templateUrl : "app/views/profile.hbs",
            controller: "myCtrl",
            controllerAs: "myCtrl"
        })
        .otherwise({redirectTo: "/"});

        $locationProvider.html5Mode({
           enabled: true,
           requiredBase: false
        });
});