angular.module("controllerApp", ['userservices'])

.controller("myCtrl", function($http, $location, $timeout, User) {
    var app = this;

    this.myFunc = function (reg) {
        app.loading = true;
        User.create(reg).then(function (res) {
            console.log(res.data.message);
            if (res.data.success) {
                app.successMsg = res.data.message;
                app.success = res.data.success;
                app.loading = false;
                $timeout(function () {
                    $location.path('/');
                }, 2000);
            } else {
                app.errorMsg = res.data.message;
                app.success = res.data.success;
                app.loading = false;
            }
        });
    }


});