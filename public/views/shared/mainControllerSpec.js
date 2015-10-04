'use strict';


describe('BOL Main Module', function() {


    var scope, controller;

    beforeEach(module('bol.main'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        controller = $controller('MainCtrl', {
            $scope: scope
        });

    }));

    it('Should do this', function () {

        expect(controller.maxChapters).toBe(22);
    });


});
