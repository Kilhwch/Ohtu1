exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the location of this config.
  specs: [
<<<<<<< HEAD
    'spec/*_spec.js'
=======
    'test/e2e/**/*_spec.js'
>>>>>>> 5a75e3b8982fa2fa91278d67dc9054bbe50566da
  ],


  capabilities: {
<<<<<<< HEAD
    'browserName': 'chrome',
    'chromeOptions': {'args': ['--disable-extensions']}
=======
    'browserName': 'firefox'
>>>>>>> 5a75e3b8982fa2fa91278d67dc9054bbe50566da
  },


  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:38765',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 10000
  }
};
