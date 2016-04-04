
'use strict';

scrollService.$inject = ['$http', '$sce', '$window'];

function scrollService( $http, $sce, $window) {


    var display = [], chapterLock = false, chapter = 1;

    var service = {

        activeScreens: { data: {} },
        trustHtml: trustHtml,
        preLoader: { state: false },
        activate: activate

    };

    return service;

    function activate(maxChapters){

        getChapter(chapter);

        $window.onscroll = function(ev) {

            if (($window.innerHeight + $window.scrollY) >= document.body.scrollHeight - 100 && chapter <= maxChapters && chapterLock == false) {

                chapterLock = true;
                getChapter(chapter);

            }
        };

    }



    function getChapter() {

        service.preLoader.state = true;

        var jsonUrl = 'assets/json/chapter' + chapter + '.json';

        $http.get(jsonUrl).success(function(data) {

            var screens = data.chapter;

            for (var key in screens) {
                if(screens[key].type != 'info' ) {
                    display.push({screen: screens[key].screen, type: screens[key].type});
                }
            }

            service.preLoader.state = false;

            service.activeScreens.data = display;

            chapter ++;
            chapterLock = false;


        }).error(function() {
            console.log('ajax fail');

        });

    };

    function trustHtml(htmlCode)
        {
            return $sce.trustAsHtml(htmlCode);
        }


}
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

'use strict';

paginatedService.$inject = ['$http', '$state', '$sce', '$stateParams', '$rootScope', '$timeout' , '$window'];

function paginatedService( $http, $state, $sce, $stateParams, $rootScope, $timeout , $window ) {




    var service = {
        nextScreen: { data: 0 },
        prevScreen: { data: 0 },
        activeScreen: { data: 0 },
        activeScreens: { data: {} },
        updateDisplay: updateDisplay,
        trustHtml: trustHtml,
        pressScreen: pressScreen,
        resetDisplay: resetDisplay,
        activate: activate
    };

    return service;

    function activate(maxChapters) {

        var activeChapter = parseInt($stateParams.chapter);

        if (activeChapter > maxChapters || activeChapter < 1 ){

            $state.go('pagination', { chapter: 1, paragraph: 1 });

        } else {

            var jsonURL = "assets/json/chapter" + activeChapter + ".json";

            $http.get(jsonURL , { cache: true}).success(function(data) {

                var screens = data.chapter;

                var display = [];

                for (var key in screens) {
                    if(screens[key].type != 'text' ){
                        display.push({screen:screens[key].screen , type: screens[key].type});
                    }
                }

                service.activeScreens.data = display;

                updateDisplay($stateParams.paragraph);


            }).error(function() {

                $window.location.reload();
            });

        }


        if(!$rootScope.previousState){
            preLoad()
        }



    }

    function updateDisplay(screen) {

        var activeChapter = parseInt($stateParams.chapter);
        var screenCount = service.activeScreens.data.length;

        if (screen == 'final'){

            screen = screenCount;


        }

        screen = parseInt(screen);



        if (screen > screenCount){



            var nextChapter = activeChapter + 1;


            $state.transitionTo('pagination', { chapter: nextChapter, paragraph: 1 }, {reload: false, inherit: true, location: true, notify: false});

            $timeout(function() {
                $state.transitionTo('pagination', { chapter: nextChapter, paragraph: 1 }, {reload: true, inherit: true, location: true, notify: true});
            }, 0);


        } else if(screen < 1){

            var prevChapter = activeChapter - 1;

            $state.transitionTo('pagination', { chapter: prevChapter, paragraph: 'final' }, {reload: false, inherit: true, location: true, notify: false});

            $timeout(function() {
                $state.transitionTo('pagination', { chapter: prevChapter, paragraph: 'final' }, {reload: true, inherit: true, location: true, notify: true});
            }, 0);

        } else if(screen >= 1 && screen <= screenCount ){

            service.activeScreen.data = screen;
            service.nextScreen.data = screen + 1;
            service.prevScreen.data = screen - 1;

            $state.go('pagination', { chapter: activeChapter , paragraph: screen }, {notify: false});

        }


    };


    function resetDisplay()
        {
            $window.location.reload();
        }

    function pressScreen()
        {
            $state.go('fulltext')
        }


    function trustHtml(htmlCode)
        {
        return $sce.trustAsHtml(htmlCode);
        }

    function preLoad(){

        $http.get('assets/json/chapter1.json', { cache: true});
        $http.get('assets/json/chapter2.json', { cache: true});
        $http.get('assets/json/chapter3.json', { cache: true});
        $http.get('assets/json/chapter4.json', { cache: true});
        $http.get('assets/json/chapter5.json', { cache: true});
        $http.get('assets/json/chapter6.json', { cache: true});
        $http.get('assets/json/chapter7.json', { cache: true});
        $http.get('assets/json/chapter8.json', { cache: true});
        $http.get('assets/json/chapter9.json', { cache: true});
        $http.get('assets/json/chapter10.json', { cache: true});
        $http.get('assets/json/chapter11.json', { cache: true});
        $http.get('assets/json/chapter12.json', { cache: true});
        $http.get('assets/json/chapter13.json', { cache: true});
        $http.get('assets/json/chapter14.json', { cache: true});
        $http.get('assets/json/chapter15.json', { cache: true});
        $http.get('assets/json/chapter16.json', { cache: true});
        $http.get('assets/json/chapter17.json', { cache: true});
        $http.get('assets/json/chapter18.json', { cache: true});
        $http.get('assets/json/chapter19.json', { cache: true});
        $http.get('assets/json/chapter20.json', { cache: true});
        $http.get('assets/json/chapter21.json', { cache: true});
        $http.get('assets/json/chapter22.json', { cache: true});



    }

}
(function() {

    'use strict';

    angular.module('bol.paginated', ['ui.router'])
        .factory('paginatedService', paginatedService)
        .controller('PaginatedCtrl',  PaginatedCtrl)
        .config(['$stateProvider', function($stateProvider) {

            $stateProvider
                .state('pagination', {
                    url: "/:chapter/:paragraph",
                    parent: 'main',
                    templateUrl: "views/paginated/paginated.html",
                    controller: 'PaginatedCtrl',
                    controllerAs: 'vm'
                })

        }]);


   PaginatedCtrl.$inject = ['$scope','paginatedService' , 'maxChapters'];

    function PaginatedCtrl($scope , paginatedService , maxChapters) {

        /* jshint validthis: true */
        var vm = this;

        vm.nextScreen = paginatedService.nextScreen;
        vm.prevScreen = paginatedService.prevScreen;
        vm.activeScreen = paginatedService.activeScreen;
        vm.activeScreens = paginatedService.activeScreens;
        vm.updateDisplay = paginatedService.updateDisplay;
        vm.trustHtml = paginatedService.trustHtml;
        vm.pressScreen = paginatedService.pressScreen;
        vm.resetDisplay = paginatedService.resetDisplay;
        vm.test = function(){

           $scope.$parent.vm.displayMenu(true)

        }


        paginatedService.activate(maxChapters)

    }


})();

    'use strict';

    mainService.$inject = ['$state', '$timeout'];

    function mainService($state , $timeout ) {


        var service = {
            menuDisplay: { state: false },
            displayMenu: displayMenu,
            adjustFont: adjustFont,
            fullBook: fullBook
        };

        return service;

        function displayMenu(display) {

            service.menuDisplay.state = display;

        }


        function adjustFont(scale) {

            var element = document.getElementsByTagName('html'),
                style = window.getComputedStyle(element[0]),
                pxSize = style.getPropertyValue('font-size'),
                fontSize = parseInt(pxSize);

            if(scale == "increase") {
                fontSize ++;
            } else {
                fontSize --;
            }

            element[0].style.fontSize = fontSize + 'px';

        }

        function fullBook() {

            service.menuDisplay.state = false;
            $state.go('fulltext', {reload: false, inherit: true, location: true, notify: false});
            $timeout(function() {
                $state.go('fulltext', {reload: true, inherit: true, location: true, notify: true});
            }, 0);

        }
    }


(function() {

        'use strict';

        angular.module('bol.main', ['ui.router'])
            .value('maxChapters', 10)
            .factory('mainService', mainService)
            .controller('MainCtrl',  MainCtrl)
            .config(['$stateProvider', function($stateProvider) {
                $stateProvider

                    .state('main', {
                        abstract: true,
                        templateUrl: "views/shared/main.html",
                        controller: 'MainCtrl',
                        controllerAs: 'vm'
                    })

            }]);

        MainCtrl.$inject = [ '$rootScope', 'mainService'];

        function MainCtrl( $rootScope, mainService) {

            /* jshint validthis: true */
            var vm = this;

            vm.menuDisplay = mainService.menuDisplay;
     //       vm.activeScreens = [];
            vm.maxChapters = 22;
            vm.displayMenu = mainService.displayMenu;
            vm.adjustFont = mainService.adjustFont;
            vm.fullBook = mainService.fullBook;

            $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {

                $rootScope.previousState = from.name;
                $rootScope.previousParams = fromParams;

            });


        }


})();


(function() {

    'use strict';

    angular.module('bol', ['ui.router','hmTouchEvents','bol.main','bol.paginated','bol.scroll'])

        .config(['$urlRouterProvider', function( $urlRouterProvider) {

            $urlRouterProvider.otherwise("/1/1");

        }]).run(['$rootScope', '$state', function ($rootScope, $state) {
            $rootScope.$state = $state;
        }]);

})();


