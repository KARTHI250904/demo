// Create AngularJS Application Module
var app = angular.module('myApp', []);

// Main Login Controller
app.controller('loginCtrl', function($scope, $timeout, $filter) {
    
    // Initialize user object
    $scope.user = {
        username: '',
        email: '',
        password: ''
    };

    // Initialize message flags
    $scope.showSuccess = false;
    $scope.showError = false;
    $scope.successMessage = '';
    $scope.errorMessage = '';
    $scope.loggedInUser = null;
    $scope.loginTime = null;

    // Login function with validation
    $scope.login = function() {
        // Reset messages
        $scope.showSuccess = false;
        $scope.showError = false;

        // Validate form
        if (!$scope.loginForm.$valid) {
            $scope.showError = true;
            $scope.errorMessage = 'Please fill all fields correctly.';
            return;
        }

        // Check if all fields are filled
        if (!$scope.user.username || !$scope.user.email || !$scope.user.password) {
            $scope.showError = true;
            $scope.errorMessage = 'Please fill all required fields.';
            return;
        }

        // Validate username length
        if ($scope.user.username.length < 3) {
            $scope.showError = true;
            $scope.errorMessage = 'Username must be at least 3 characters long.';
            return;
        }

        // Validate password strength
        if ($scope.user.password.length < 6) {
            $scope.showError = true;
            $scope.errorMessage = 'Password must be at least 6 characters long.';
            return;
        }

        // Validate email format (basic validation)
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test($scope.user.email)) {
            $scope.showError = true;
            $scope.errorMessage = 'Please enter a valid email address.';
            return;
        }

        // If all validations pass, show success message
        $scope.showSuccess = true;
        $scope.successMessage = 'Login Successful! Welcome ' + $scope.user.username + '!';
        
        // Store logged-in user info
        $scope.loggedInUser = angular.copy($scope.user);
        $scope.loginTime = new Date();

        // Hide success message after 3 seconds
        $timeout(function() {
            $scope.showSuccess = false;
        }, 3000);
    };

    // Logout function
    $scope.logout = function() {
        // Reset all user data
        $scope.user = {
            username: '',
            email: '',
            password: ''
        };
        $scope.loggedInUser = null;
        $scope.loginTime = null;
        $scope.showSuccess = false;
        $scope.showError = false;

        // Reset form
        $scope.loginForm.$setPristine();
        $scope.loginForm.$setUntouched();
    };

    // Watch for changes in username field
    $scope.$watch('user.username', function(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
            console.log('Username changed to: ' + newVal);
        }
    });

    // Watch for changes in email field
    $scope.$watch('user.email', function(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
            console.log('Email changed to: ' + newVal);
        }
    });

    // Initialize with sample data (optional - for testing)
    // $scope.user.username = 'John';
    // $scope.user.email = 'john@example.com';
    // $scope.user.password = 'password123';
});

// Custom Filter for capitalizing first letter
app.filter('capitalize', function() {
    return function(input) {
        if (!input) return input;
        return input.charAt(0).toUpperCase() + input.slice(1);
    };
});

// Custom Directive for password strength indicator (optional)
app.directive('passwordStrength', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$validators.passwordStrength = function(modelValue) {
                if (!modelValue) return true;
                
                // Check password strength
                var strength = 0;
                if (modelValue.length >= 6) strength++;
                if (/[a-z]/.test(modelValue)) strength++;
                if (/[A-Z]/.test(modelValue)) strength++;
                if (/[0-9]/.test(modelValue)) strength++;
                if (/[^a-zA-Z0-9]/.test(modelValue)) strength++;
                
                return strength >= 2; // Require at least medium strength
            };
        }
    };
});
