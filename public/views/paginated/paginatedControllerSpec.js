'use strict';


describe('BOL Paginated Module', function() {


    var scope, controller;

    beforeEach(module('bol.main'));

    beforeEach(module('bol.paginated'));

    beforeEach(inject(function ($controller, $rootScope) {

        scope = $rootScope.$new();

        controller = $controller('PaginatedCtrl', {
            $scope: scope
        });

    }));

    it('Paginated controller should exist', function () {

        expect(controller).toBeDefined();

    });


});

