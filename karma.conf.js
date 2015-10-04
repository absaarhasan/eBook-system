// Karma configuration
// Generated on Fri Oct 02 2015 12:35:04 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'public/assets/lib/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'public/assets/lib/hammer.min.js',
      'public/assets/lib/angular-resource.min.js',
      'public/assets/lib/angular-ui-router.min.js',
      'public/assets/lib/angular.hammer.min.js',
      'public/views/shared/mainServices.js',
      'public/views/shared/mainController.js',
      'public/views/shared/mainControllerSpec.js',
      'public/views/paginated/paginatedServices.js',
      'public/views/paginated/paginatedController.js',
      'public/views/scroll/scrollServices.js',
      'public/views/scroll/scrollController.js',
      'public/app.js'
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
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
