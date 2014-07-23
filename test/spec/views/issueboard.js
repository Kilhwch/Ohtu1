'use strict';

describe('TODO list', function() {
    it('should have all tasts', function() {
      browser.get('http://localhost:38765/#/repos/Kilhwch/Ohtu1');
      expect(element.all(by.repeater('issue in issues')).count()).toEqual(10);
    });
});

