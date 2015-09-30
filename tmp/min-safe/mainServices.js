
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

