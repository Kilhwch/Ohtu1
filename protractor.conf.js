exports.config = {
  // The address of a running selenium server.
  //  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the location of this config.
  specs: [
    'app/scripts/**/*_spec.js',
    'test/spec/*_spec.js'
  ],


  capabilities: {
   'browserName': 'firefox',
   'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs',
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
