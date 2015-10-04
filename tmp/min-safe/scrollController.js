(function() {

    'use strict';

    angular.module('bol.scroll', ['ui.router'])

        .factory('scrollService', scrollService)
        .controller('ScrollCtrl',  ScrollCtrl)
        .config(['$stateProvider', function($stateProvider) {

            $stateProvider
                .state('fulltext', {
                    url: '/fullbook',
                    parent: 'main',
                    templateUrl: "views/scroll/scroll.html",
                    controller: 'ScrollCtrl',
                    controllerAs: 'vm'
                })

        }]);

    ScrollCtrl.$inject = ['$scope','scrollService'];

    function ScrollCtrl($scope,scrollService) {


        /* jshint validthis: true */
        var vm = this;

        vm.activeScreens = scrollService.activeScreens;
        vm.trustHtml = scrollService.trustHtml;

        scrollService.activate(($scope.$parent.vm.maxChapters))



    }

})();