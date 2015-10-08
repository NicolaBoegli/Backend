'use strict';
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;


// usemin custom step
var useminAutoprefixer = {
    name: 'autoprefixer',
    createConfig: function (context, block) {
        if (block.src.length === 0) {
            return {};
        } else {
            return require('grunt-usemin/lib/config/cssmin').createConfig(context, block); // Reuse cssmins createConfig
        }
    }
};

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
    });
    require('time-grunt')(grunt);

    grunt.initConfig({
        autoprefixer: {
            // src and dest is configured in a subtask called "generated" by usemin
        },
        wiredep: {
            app: {
                src: ['src/main/web/index.html']
            }
        },
        watch: {
            styles: {
                files: ['src/main/assets/styles/**/*.css']
            },
            jshint: {
                files: ['src/main/web/scripts/**/*.js'],
                tasks: ['jshint']
            },
            templates: {
                files: ['src/main/web/views/template/**/*.html'],
                tasks: ['ngtemplates:dev']
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    'src/main/web/**/*.html',
                    'src/main/web/**/*.json',
                    'src/main/web/**/*.js',
                    '{.tmp/,}src/main/web/assets/styles/**/*.css',
                    '{.tmp/,}src/main/web/scripts/**/*.js',
                    'src/main/web/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/main/web/scripts/**/*.js',
                '!src/main/web/scripts/aspects/templates.js'
            ]
        },
        concat: {
            // src and dest is configured in a subtask called "generated" by usemin
        },
        uglifyjs: {
            // src and dest is configured in a subtask called "generated" by usemin
        },
        rev: {
            dist: {
                files: {
                    src: [
                        'dist/scripts/**/*.js',
                        'dist/assets/styles/**/*.css',
                        'dist/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                        'dist/assets/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: 'src/main/web/**/*.html',
            options: {
                dest: 'dist',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin', useminAutoprefixer] // Let cssmin concat files so it corrects relative paths to fonts and images
                        },
                        post: {}
                    }
                }
            }
        },
        usemin: {
            html: ['dist/**/*.html'],
            css: ['dist/assets/styles/**/*.css'],
            js: ['dist/scripts/**/*.js'],
            options: {
                assetsDirs: ['dist', 'dist/assets/styles', 'dist/assets/images', 'dist/assets/fonts'],
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                },
                dirs: ['dist']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/main/web/assets/images',
                    src: '**/*.{jpg,jpeg}', // we don't optimize PNG files as it doesn't work on Linux. If you are not on Linux, feel free to use '**/*.{png,jpg,jpeg}'
                    dest: 'dist/assets/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/main/assets/images',
                    src: '**/*.svg',
                    dest: 'dist/assets/images'
                }]
            }
        },
        cssmin: {
            // src and dest is configured in a subtask called "generated" by usemin
        },
        ngtemplates: {
            dist: {
                cwd: 'src/main',
                src: ['assets/templates/**/*.html'],
                dest: '.tmp/templates/templates.js',
                options: {
                    module: 'sampleapp',
                    usemin: 'scripts/app.js',
                    htmlmin: {
                        removeCommentsFromCDATA: true,
                        // https://github.com/yeoman/grunt-usemin/issues/44
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true,
                        conservativeCollapse: true,
                        removeAttributeQuotes: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true
                    }
                }
            },
            dev: {
                cwd: 'src/main/web/views/',
                src: ['template/**/*.html'],
                dest: 'src/main/web/scripts/aspects/templates.js',
                options: {
                    module: 'sampleapp'
                }
            },
            test: {
                cwd: 'src/main/web',
                src: ['assets/templates/**/*.html','views/**/*.html'],
                dest: 'src/test/web/helpers/templates.js',
                options: {
                    module: 'sampleapp'
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    keepClosingSlash: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: 'src/main',
                    dest: 'dist/assets/fonts',
                    src: [
                        'bower_components/bootstrap/fonts/*.*'
                    ]
                }]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'src/main/web',
                        dest: 'dist',
                        src: [
                            '*.html',
                            'scripts/**/*.html',
                            'assets/images/**/*.{png,gif,webp,jpg,jpeg,svg}',
                            'assets/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/assets/images',
                        dest: 'dist/assets/images',
                        src: [
                            'generated/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'src/main/web/i18n',
                        dest: 'dist/i18n',
                        src: [
                            '**/*.json'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'src/main/web/views',
                        dest: 'dist/views',
                        src: [
                            '*.html', '**/*.html'
                        ]
                    }
                ]
            },
            ngconstants: {
                files: [{
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: '.tmp/scripts/app',
                    dest: 'dist/scripts',
                    src: [
                        '**'
                    ]
                }]
            }
        },
        connect: {
            proxies: [
                {
                    context: '/api',
                    host: 'localhost',
                    port: 8080,
                    https: false,
                    changeOrigin: false
                }
            ],
            options: {
                port: 9000,
                // Change this to 'localhost' to deny access to the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        'src/main/web'
                    ],
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            connect.static('.tmp'),
                            connect.static('src/main/web')
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        'src/main/web'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: 'dist',
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            connect.static('dist')
                        ];
                    }
                }
            }
        },
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },
        ngconstant: {
            options: {
                name: 'sampleapp',
                deps: false,
                wrap: '\'use strict\';\n// DO NOT EDIT THIS FILE, EDIT THE GRUNT TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n{%= __ngModule %}'
            },
            dev: {
                options: {
                    dest: 'src/main/web/scripts/app/app.constants.js'
                },
                constants: {
                    ENV: 'dev',
                    VERSION: '0.0.1',
                    baseUrl: 'http://localhost:9000/api',
                    supportedLanguages: ['de', 'fr', 'it', 'en']
                }
            },
            prod: {
                options: {
                    dest: 'src/main/scripts/app/app.constants.js'
                },
                constants: {
                    ENV: 'prod',
                    VERSION: '0.0.1',
                    baseUrl: 'http://jobdesk-alvchegov.rhcloud.com/jobdesk',
                    supportedLanguages: ['de', 'fr', 'it', 'en']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'src/test/web/karma.conf.js'
            },
            dist: {
                configFile: 'src/test/web/karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS'],
                logLevel: 'ERROR'
            }
        }
    });

    grunt.registerTask('serve', [
        'clean:server',
        'wiredep',
        'ngconstant:dev',
        'configureProxies',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('test', [
        'ngtemplates:test',
        'wiredep:app',
        'karma:dist'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep:app',
        'ngconstant:prod',
        'useminPrepare',
        'ngtemplates:dist',
        'imagemin',
        'svgmin',
        'concat',
        'copy:fonts',
        'copy:dist',
        'copy:ngconstants',
        'ngAnnotate',
        'cssmin',
        'autoprefixer',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};