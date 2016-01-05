(function () {
    'use strict';

    angular
        .module('app')
        .controller('Users.AddEditController', Controller);

    function Controller($scope, $state, $stateParams, UserService, ToastService) {
        var vm = this;

        vm.title = 'Add User';
        vm.user = {};
        vm.saveUser = saveUser;

        initController();

        function initController() {
            if ($stateParams.id) {
                vm.title = 'Edit User';
                UserService.GetById($stateParams.id)
                    .then(function (user) {
                        vm.user = user;
                    });
            }
        }

        function saveUser(user) {
            if ($scope.userForm.$invalid) {
                return;
            }

            if (!user.id) {
                createUser()
            } else {
                updateUser();
            }

            function createUser() {
                UserService.Create(user)
                    .then(function () {
                        vm.saved = true;

                        // redirect to users view
                        $state.go('users');
                        ToastService.Success('User created');

                        // emit event so list controller can refresh
                        $scope.$emit('users');
                    })
                    .catch(function (error) {
                        ToastService.Error(error);
                    });
            }

            function updateUser() {
                vm.updatedId = user.id;
                UserService.Update(user)
                    .then(function () {
                        vm.saved = true;

                        // redirect to users view
                        $state.go('users');
                        ToastService.Success('User updated');

                        // emit event so list controller can refresh
                        $scope.$emit('users');
                    })
                    .catch(function (error) {
                        ToastService.Error(error);
                    });
            }
        }
    }

})();