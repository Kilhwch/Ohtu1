'use strict';

describe('Service: gitapiService', function () {

  // load the service's module
  beforeEach(module('ohtuProjektiAppApp'));

  // instantiate service
  var gitapiService;
  beforeEach(inject(function (_gitapiService_) {
    gitapiService = _gitapiService_;
  }));

  it('should do something', function () {
    expect(!!gitapiService).toBe(true);
  });

});
