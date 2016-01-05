(function () {
    'use strict';

    angular
        .module('app', ['ngMaterial', 'ngAnimate', 'ngMessages', 'ui.router', 'wj'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('overview', {
                url: '/',
                templateUrl: 'overview/main.html',
                controller: 'Overview.MainController',
                controllerAs: 'vm',
                data: { selectedTab: 0 }
            })
            .state('users', {
                url: '/users',
                templateUrl: 'users/main.html',
                controller: 'Users.MainController',
                controllerAs: 'vm',
                data: { selectedTab: 1 }
            })
                .state('users.add', {
                    url: '/add',
                    templateUrl: 'users/add-edit.html',
                    controller: 'Users.AddEditController',
                    controllerAs: 'vm'
                })
                .state('users.edit', {
                    url: '/edit/:id',
                    templateUrl: 'users/add-edit.html',
                    controller: 'Users.AddEditController',
                    controllerAs: 'vm'
                });
    }

    function run() {
    }

})();