angular.module('mainController',['validateService'])

.controller('mainCtrl', function ($http, $location, $timeout, validation) {
    var app = this;

    if(validation.isLoggedIn()){
        app.loggedin = true;
        console.log('logged in');
        validation.getUser().then(function (res) {
            console.log(res);
        });
    }else{
        app.loggedin = false;
        console.log('logged out');
    }

    this.mylogin = function (reg) {
        app.loading = true;
        validation.validate(reg).then(function (res) {
            console.log(res.data.message);
            if(res.data.success){
                app.successMsg = res.data.message;
                app.success = res.data.success;
                app.loading = false;
                $timeout(function () {
                    $location.path('/profile');
                },1000);
            }else{
                app.errorMsg = res.data.message;
                app.success = res.data.success;
                app.loading = false;
            }
        });
    };
    
    this.dologout = function () {
       validation.logout();
       $location.path('/logout');
       $timeout(function () {
           $location.path('/');
       },1000);
    };
});