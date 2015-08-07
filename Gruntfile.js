module.exports = function(grunt) {


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.config('concat', {
        scripts: {
            src: [
                //'bower_components/jquery/dist/jquery.js',
                //'bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.5.js',
                'js/main.js'],
            dest: 'tmp/main.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.config('uglify', {
        scripts: {
            files: {
                'public/assets/main.js' : 'tmp/main.js'
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
                'public/assets/app.css': ['tmp/app.css']
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
            files: ['js/**/*.js'],
            tasks: ['concat:scripts', 'uglify'],

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
        [/*'concat:scripts',*/ 'svgmin' , 'sass', 'cssmin'/*, 'uglify' */]);


};

