// Karma configuration
// Generated on Thu Nov 19 2015 15:55:24 GMT+0100 (W. Europe Standard Time)

// http://jbavari.github.io/blog/2014/06/11/unit-testing-angularjs-services/
// http://andyshora.com/unit-testing-best-practices-angularjs.html
// http://www.benlesh.com/2013/05/angularjs-unit-testing-controllers.html
// http://www.benlesh.com/2013/06/angular-js-unit-testing-services.html

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../js/vendor/jquery.js',
      '../js/vendor/**/*.js',
      '../js/plugins/**/*.js',
      '../js/foundation.min.js',
      '../js/default.js',
      '../tests/unit/**/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    customLaunchers: {
        chrome_without_security: {
          base: "Chrome",
          flags: ["--disable-web-security"]
        }
      },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
