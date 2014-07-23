describe('Home view', function() {
    var mockModule = require('../mocked-backend'),
            prot;

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
        browser.get('http://localhost:9001');
        browser.manage().addCookie('token', 'testing', '/', 'localhost');
    });

    it('has a title', function() {
        browser.get('/');
        expect(browser.getTitle()).toEqual('Haitari');
    });

    it('updates after logout', function() {
        var ptor = protractor.getInstance();
        ptor.get('/');
        expect(ptor.element(by.id('list')).getText()).toEqual('List');
        ptor.get('/#/logout');
        expect(ptor.element(by.id('login')).getText()).toEqual('Login');
    });
});
