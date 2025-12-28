var app = angular.module("loginApp", []);

app.controller("LoginController", function($scope, $http) {

    $scope.register = function() {
        $http.post("register.php", $scope.user)
        .then(function(response) {
            $scope.message = response.data;
        });
    };

    $scope.loginUser = function() {
        $http.post("login.php", $scope.login)
        .then(function(response) {
            $scope.message = response.data;
        });
    };

});