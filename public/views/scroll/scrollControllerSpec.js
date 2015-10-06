'use strict';


describe('BOL Scroll Module', function() {


    var scope, scrollCtrl;

    beforeEach(module('bol.main'));

    beforeEach(module('bol.scroll'));

    beforeEach(inject(function ($controller, $rootScope , $compile) {

       scope = $rootScope.$new();

        scrollCtrl = $controller('ScrollCtrl', {
            $scope: scope
        });

        var el1 = angular.element('<html></html>');
        $compile(el1)(scope);

        var el2 = angular.element('<div id="preloader"></div>');
        $compile(el2)(scope);

    }));

    it('Scroll controller should exist', function () {

        expect(scrollCtrl).toBeDefined();

    });


});

