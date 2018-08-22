angular.module('mainController',['validateService'])

.controller('mainCtrl', function ($http, $location, $timeout, validation) {
    var app = this;

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
                },2000);
            }else{
                app.errorMsg = res.data.message;
                app.success = res.data.success;
                app.loading = false;
            }
        });
    };

    if(validation.isLoggedIn()){
        app.loggedin = true;
    }else{
        app.loggedin = false;
    }
});