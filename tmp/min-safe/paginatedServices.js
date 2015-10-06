
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