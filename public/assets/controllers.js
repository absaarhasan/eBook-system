

function MainCtrl($scope, $state, $rootScope, $timeout) {



    $scope.menuDisplay = false;

    $scope.showMenu = function() {
        $scope.menuDisplay = true;
    };

    $scope.hideMenu = function() {
        $scope.menuDisplay = false;
    };

    $scope.increaseFont = function() {

        var element = document.getElementsByTagName('html'),
            style = window.getComputedStyle(element[0]),
            pxSize = style.getPropertyValue('font-size'),
            fontSize = parseInt(pxSize);
            fontSize ++;

        var newFontSize = fontSize + 'px';

            element[0].style.fontSize = newFontSize;


    };

    $scope.decreaseFont = function() {

        var element = document.getElementsByTagName('html'),
            style = window.getComputedStyle(element[0]),
            pxSize = style.getPropertyValue('font-size'),
            fontSize = parseInt(pxSize);
            fontSize --;
        var newFontSize = fontSize + 'px';
            element[0].style.fontSize = newFontSize;

    };

    $scope.fullBook = function() {
            $scope.hideMenu();
            $state.go('fulltext', {reload: false, inherit: true, location: true, notify: false});
            $timeout(function() {
                $state.go('fulltext', {reload: true, inherit: true, location: true, notify: true});
            }, 0);


    }

    $scope.activeScreens = [];

    $scope.maxChapters = 22;




    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {


            $rootScope.previousState = from.name;
            $rootScope.previousParams = fromParams;


    });

}


function SetupCtrl( $state) {

    $state.go('pagination', { chapter: 1, paragraph: 1  });

}

function PaginatedCtrl($scope, $http, $state, $sce , $stateParams, $rootScope, $timeout, $window) {

    document.getElementsByTagName('html')[0].classList.remove("fullbook");

    var activeChapter = parseInt($stateParams.chapter);

    if (activeChapter > $scope.maxChapters || activeChapter < 1 ){

        $state.go('pagination', { chapter: 1, paragraph: 1 });

    } else {

        var jsonURL = "/json/chapter" + activeChapter + ".json";

        $http.get(jsonURL , { cache: true}).success(function(data) {


                var screens = data.chapter;

                var display = [];

                for (var key in screens) {
                    if(screens[key].type != 'text' ){
                        display.push({screen:screens[key].screen , type: screens[key].type});
                    }
                }


                $scope.activeScreens = display;


                $scope.updateDisplay($stateParams.paragraph);


        }).error(function() {

           $window.location.reload();
        });;

    }

    $scope.updateDisplay = function(screen) {


        var screenCount = $scope.activeScreens.length;

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



            $scope.activeScreen = screen;
            $scope.nextScreen = screen + 1;
            $scope.prevScreen = screen - 1;

            $state.go('pagination', { chapter: activeChapter , paragraph: screen }, {notify: false});

        }


    };


    $scope.resetDisplay = function()
        {
            $window.location.reload();
        }


    $scope.pressScreen = function()
        {
            $state.go('fulltext')
        }

    $scope.trustHtml = function(htmlCode)
        {
            return $sce.trustAsHtml(htmlCode);
        }

    if(!$rootScope.previousState){

        $http.get('json/chapter1.json', { cache: true});
        $http.get('json/chapter2.json', { cache: true});
        $http.get('json/chapter3.json', { cache: true});
        $http.get('json/chapter4.json', { cache: true});
        $http.get('json/chapter5.json', { cache: true});
        $http.get('json/chapter6.json', { cache: true});
        $http.get('json/chapter7.json', { cache: true});
        $http.get('json/chapter8.json', { cache: true});
        $http.get('json/chapter9.json', { cache: true});
        $http.get('json/chapter10.json', { cache: true});
        $http.get('json/chapter11.json', { cache: true});
        $http.get('json/chapter12.json', { cache: true});
        $http.get('json/chapter13.json', { cache: true});
        $http.get('json/chapter14.json', { cache: true});
        $http.get('json/chapter15.json', { cache: true});
        $http.get('json/chapter16.json', { cache: true});
        $http.get('json/chapter17.json', { cache: true});
        $http.get('json/chapter18.json', { cache: true});
        $http.get('json/chapter19.json', { cache: true});
        $http.get('json/chapter20.json', { cache: true});
        $http.get('json/chapter21.json', { cache: true});
        $http.get('json/chapter22.json', { cache: true});


    }




}

function FulltextCtrl($scope, $http,  $sce, $window) {

    document.getElementsByTagName('html')[0].classList.add("fullbook");

    var display = [], chapter = 1, loader = document.getElementById("preloader");



    function getChapter() {


        loader.classList.add("show");

        var jsonUrl = '/json/chapter' + chapter + '.json';

        $http.get(jsonUrl).success(function(data) {

            loader.classList.remove("show");

            var screens = data.chapter;

            for (var key in screens) {

                    display.push({screen:screens[key].screen , type: screens[key].type});

            }

            $scope.activeScreens = display;

            chapter ++;



        }).error(function() {
            console.log('ajax fail');

        });

    };

    getChapter(chapter);

    $window.onscroll = function(ev) {


        if (($window.innerHeight + $window.scrollY) >= document.body.scrollHeight - 200 && chapter <= $scope.maxChapters) {

            getChapter(chapter);

        }
    };


    $scope.trustHtml = function(htmlCode)
    {
        return $sce.trustAsHtml(htmlCode);
    }


}
