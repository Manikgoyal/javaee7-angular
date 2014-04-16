'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    /*
     *   Time how long grunt tasks take to run, this might be important when having complex builds that take forever.
     *   For now just to show how fancy grunt is.
     */
    require('time-grunt')(grunt);

    // init required configurations for each task.
    grunt.initConfig({

            // Project settings
            config: {
                project: {
                    hostname: ''
                },
                path: {
                    app: {
                        root: 'src/main/webapp'
                    },
                    temp: {
                        root: 'temp'
                    },
                    build: {
                        root: 'build'
                    }
                }
            },

            clean: {
                build: [
                    '<%= config.path.temp.root %>',
                    '<%= config.path.build.root %>'
                ]
            },

            // Automatically inject Bower components into the HTML file
            bowerInstall: {
                app: {
                    src: '<%= config.path.app.root %>/index.html',
                    ignorePath: '<%= config.path.app.root %>'
                }
            },

            // this is usefull when we have more than one css file, not the case now...
/*
            concat: {
                styles: {
                    src: [
                        '<%= config.path.app.root %>/css/style.css',
                    ],
                    dest: '<%= config.path.temp.root %>/concat/css/application.css'
                }
            },
*/

            // Copies remaining files to places other tasks can use
            // TODO: review this, might not be nedded
            copy: {
                build: {
                    files: [
                        {
                            src: '<%= config.path.app.root %>/index.html',
                            dest: '<%= config.path.build.root %>/index.html'
                        }
                    ]
                }
            },

            // Minifies index.html file.
            htmlmin: {
                prod: {
                    options: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeComments: true,
                        removeCommentsFromCDATA: true,
                        removeEmptyAttributes: true,
                        removeOptionalTags: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '<%= config.path.build.root %>',
                            src: ['index.html'],
                            dest: '<%= config.path.build.root %>'
                        }
                    ]
                }
            },

            // Reads HTML for usemin blocks to enable smart builds
            useminPrepare: {
                html: '<%= config.path.app.root %>/index.html',
                options: {
                    staging: '<%= config.path.temp.root %>',
                    root: '<%= config.path.app.root %>',
                    dest: '<%= config.path.build.root %>'
                }
            },

            usemin: {
                html: '<%= config.path.build.root %>/index.html'
            },

            uglify: {
                options: {
                    mangle: false
                }
            }
        }
    );

    // Task: Build production version ready for deployment
    grunt.registerTask('build', [
        'clean:build',
        //'concat:styles',
        'bowerInstall:app',
        'useminPrepare',
        'concat:generated',
        'cssmin',
        'uglify',
        'copy:build',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};