describe('Unit test my directive', function() {
   var $compile,
       $rootScope;

    beforeEach(module('sampleapp'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
        var element = $compile('<test-directive></test-directive>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toContain("Some Text");
    });
});