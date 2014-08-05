'use strict';

describe('Service: filteringOptions', function () {

  // load the service's module
  beforeEach(module('ohtuProjektiAppApp'));

  // instantiate service
  var filteringOptions;
  beforeEach(inject(function (_filteringOptions_) {
    filteringOptions = _filteringOptions_;
  }));

  it('should do something', function () {
    expect(!!filteringOptions).toBe(true);
  });

});
