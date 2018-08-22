angular.module('validateService', [])

    .factory('validation', function ($http, loginToken) {
        var validationFactory = {};

        validationFactory.validate = function (reg) {
            return $http.post('/login',reg).then(function (res) {
             loginToken.setToken(res.data.token);
             console.log(res.data.token)
             return res;
            });
        };
        validationFactory.isLoggedIn = function () {
            if(loginToken.getToken()){
                return true;
            }else{
                return false;
            }
        };
        return validationFactory;
    })

    .factory('loginToken', function ($window) {
        var loginTokenfactory = {};

        loginTokenfactory.setToken = function (token) {
            $window.localStorage.setItem('token', token);
        };
        loginTokenfactory.getToken = function () {
            $window.localStorage.getItem('token');
        }

        return loginTokenfactory;
    });