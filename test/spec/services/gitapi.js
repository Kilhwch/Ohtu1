'use strict';

describe('Service: gitapi', function () {

  // load the service's module
  beforeEach(module('ohtuProjektiAppApp'));

  // instantiate service
  var gitapi;
  beforeEach(inject(function (_gitapi_) {
    gitapi = _gitapi_;
  }));

  it('should do something', function () {
    expect(!!gitapi).toBe(true);
  });

});
