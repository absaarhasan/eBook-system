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

    ScrollCtrl.$inject = ['scrollService','maxChapters'];

    function ScrollCtrl(scrollService,maxChapters) {

        /* jshint validthis: true */
        var vm = this;

        vm.activeScreens = scrollService.activeScreens;
        vm.trustHtml = scrollService.trustHtml;
        vm.preLoader = scrollService.preLoader.state;

        scrollService.activate(maxChapters)

    }

})();