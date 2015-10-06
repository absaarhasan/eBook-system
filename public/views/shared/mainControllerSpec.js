'use strict';


describe('BOL Main Module', function() {


    var scope, mainCtrl;

    beforeEach(module('bol.main'));

    beforeEach(inject(function ($controller, $rootScope) {

        scope = $rootScope.$new();

        mainCtrl = $controller('MainCtrl', {
            $scope: scope
        });

    }));

    it('Main controller should exist', function () {

        expect(mainCtrl).toBeDefined();

    //    expect(controller.maxChapters).toBe(22);

    });


});
