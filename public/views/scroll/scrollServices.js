
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