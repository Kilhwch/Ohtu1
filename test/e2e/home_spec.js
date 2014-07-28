describe('Home view', function() {
    var mockModule = require('../mocked-backend'),
        authModule = require('../mocked-auth'),
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
    
    
    it('updates after login', function() {
        expect(ptor.element(by.id('login')).getText()).toEqual('Login');
        $('.login-button').click();
        expect(ptor.element(by.id('home')).getText()).toEqual('Home');
        expect(ptor.element(by.id('list')).getText()).toEqual('List');
        expect(ptor.element(by.id('logout')).getText()).toEqual('Logout');
    });

    it('updates after logout', function() {
        $('.login-button').click();
        expect(ptor.element(by.id('list')).getText()).toEqual('List');
        browser.get('/#/logout');
        expect(ptor.element(by.id('login')).getText()).toEqual('Login');
    });

});
