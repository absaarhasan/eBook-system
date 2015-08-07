

function MainCtrl($scope, $http, $state, $stateParams, $rootScope, $timeout, $window) {



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

    $scope.activeScreens = [];

    $scope.maxChapters = 22;




    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {


            $rootScope.previousState = from.name;
            $rootScope.previousParams = fromParams;


    });

}


function SetupCtrl( $state) {

    $state.go('pagination', { chapter: 1, page: 1 });



}

function PaginatedCtrl($scope, $http, $state, $sce , $stateParams, $rootScope, $timeout, $window) {

       document.getElementsByTagName('html')[0].classList.remove("paginated");
       document.getElementsByTagName('body')[0].classList.remove("paginated");
       document.getElementsByTagName('html')[0].classList.add("paginated");
       document.getElementsByTagName('body')[0].classList.add("paginated");

    var activeChapter = parseInt($stateParams.chapter);


    if (activeChapter > $scope.maxChapters || activeChapter < 1 ){

        $state.go('pagination', { chapter: 1, page: 1 });

    } else if(!$rootScope.previousState || $rootScope.previousParams.chapter != $stateParams.chapter ){

        var jsonURL = "/json/chapter" + activeChapter + ".json";

        $http.get(jsonURL, { cache: true}).success(function(data) {

                var screens = data.chapter;

                var display = [];

                for (var key in screens) {
                    if(screens[key].type != 'text' ){
                        display.push({screen:screens[key].screen , type: screens[key].type});
                    }
                }

                $scope.$parent.activeScreens = display;
                $timeout(function() {
                    displayScreens();
                },0);


        }).error(function() {
            console.log('ajax fail');
            $window.location.reload();
        });;

    } else {

        displayScreens();

    }


    function displayScreens (){

        var activePage;

        if($stateParams.page == 'last'){

            activePage = $scope.activeScreens.length;

        }else{

            activePage = parseInt($stateParams.page);

        }

        var maxScreens = $scope.activeScreens.length;

        if (activePage > maxScreens || activePage < 1 ){

            $state.go('pagination', { chapter: activeChapter, page: 1 });

        } else if (activePage ==  maxScreens){

            $scope.nextChapter =  activeChapter + 1 ;
            $scope.nextPage =  1;
            $scope.prevChapter =  activeChapter;
            $scope.prevPage =  activePage  - 1 ;

        } else if (activePage > 1){

            $scope.nextChapter =  activeChapter;
            $scope.nextPage =  activePage + 1 ;
            $scope.prevChapter =  activeChapter;
            $scope.prevPage =  activePage - 1 ;

        } else if (activePage == 1){

            $scope.nextChapter =  activeChapter;
            $scope.nextPage =  activePage + 1 ;
            $scope.prevChapter =  activeChapter -1 ;
            $scope.prevPage =  'last';

        }

        $scope.activePage = activePage;
    }

    $scope.swipePage = function(chapter,page)
        {
            $state.go('pagination', { chapter: chapter, page: page })
        }

    $scope.pressScreen = function()
    {

     //   $window.alert('working');
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

function FulltextCtrl($scope, $http, $state, $stateParams, $rootScope, $timeout, $sce) {


    $http.get('/json/full_book.json').success(function(data) {

            document.getElementsByTagName('html')[0].classList.remove("paginated");
            document.getElementsByTagName('body')[0].classList.remove("paginated");

            var screens = data.book;

            var display = [];

            for (var key in screens) {
                if(screens[key].type != 'text' ){
                    display.push({screen:screens[key].screen , type: screens[key].type});
                }
            }

            $scope.$parent.activeScreens = display;


        }).error(function() {
            console.log('ajax fail');
            $window.location.reload();
        });;

    $scope.trustHtml = function(htmlCode)
    {
        return $sce.trustAsHtml(htmlCode);
    }


}
