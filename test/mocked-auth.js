exports.authMock = function(browser) {
  return function() {
  angular.module('auth', ['ohtuProjektiAppApp'], function($provide) {

    function MockAuth() {}
    MockAuth.prototype.askAuth = function () {return this;};
    MockAuth.prototype.done = function (func) {
      func('testing');
      return this;
    };

    MockAuth.prototype.fail = function (func) {return this;};
      $provide.value('auth', new MockAuth());
    });
  };
}
