describe('Home view', function() {
    var mockModule = require('../../app/scripts/mocked-backend'),
        authModule = require('../../app/scripts/mocked-auth'),
        prot;

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
        ptor.addMockModule('auth', authModule.authMock);
        browser.get('#/logout');
    });

    it('has a title', function() {
        expect(browser.getTitle()).toEqual('Haitari');
    });
    
    
    xit('updates after login', function() {
        expect(ptor.element(by.id('login')).getText()).toEqual('Login');
        $('.login-button').click();
        expect(ptor.element(by.id('home')).getText()).toEqual('Haitari');
        expect(ptor.element(by.id('list')).getText()).toEqual('List');
        element(by.css('.dropdown-toggle')).click();
        expect(ptor.element(by.css('.dropdown-menu a')).getText()).toEqual('Sign out');
    });

    it('updates after logout', function() {
        $('.login-button').click();
        expect(ptor.element(by.id('list')).getText()).toEqual('List');
        browser.get('/#/logout');
        expect(ptor.element(by.css('#login')).getText()).toEqual('Login');
    });

});
