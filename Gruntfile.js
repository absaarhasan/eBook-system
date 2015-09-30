module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.config('ngAnnotate', {
        options: {
            singleQuotes: true
        },
        app: {
            files: {
                'tmp/min-safe/scrollServices.js': ['public/views/scroll/scrollServices.js'],
                'tmp/min-safe/scrollController.js': ['public/views/scroll/scrollController.js'],
                'tmp/min-safe/paginatedServices.js': ['public/views/paginated/paginatedServices.js'],
                'tmp/min-safe/paginatedController.js': ['public/views/paginated/paginatedController.js'],
                'tmp/min-safe/mainServices.js': ['public/views/shared/mainServices.js'],
                'tmp/min-safe/mainController.js': ['public/views/shared/mainController.js'],
                'tmp/min-safe/app.js': ['public/app.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.config('concat', {
        scripts: {
            src: [
                'tmp/min-safe/scrollServices.js',
                'tmp/min-safe/scrollController.js',
                'tmp/min-safe/paginatedServices.js',
                'tmp/min-safe/paginatedController.js',
                'tmp/min-safe/mainServices.js',
                'tmp/min-safe/mainController.js',
                'tmp/min-safe/app.js'],
            dest: 'tmp/main.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.config('uglify', {
        scripts: {
            files: {
                'public/assets/js/main.js' : 'tmp/main.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.config('sass', {
        app: {
            files: {
                'tmp/app.css': ['sass/style.scss']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.config('cssmin', {
        app: {
            files: {
                'public/assets/css/app.css': ['tmp/app.css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-svgmin');

    grunt.config('svgmin', {
        options: {
            plugins: [
                {
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }
            ]
        },
        dist: {
            files: [
                {
                    expand: true,
                    cwd: 'svg/',
                    src: ['*.svg'],
                    dest: 'public/images',
                    ext: '.svg'

                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.config('watch', {
        scripts: {
            files: ['public/**/*.js'],
            tasks: ['ngAnnotate','concat', 'uglify'],

            options: {
                spawn: false
            }
        },
        styles: {
            files: ['sass/**/*.scss'],
            tasks: ['sass', 'cssmin'],
            options: {
                spawn: false
            }
        },
        interface: {
            files: ['public/index.html']
        },
        options: {
            livereload: true
        }
    });

    grunt.registerTask('build', "Builds the application.",
        [/*'concat:scripts', 'svgmin' ,*/ 'sass', 'cssmin', 'ngAnnotate', 'concat','uglify' ]);


};

