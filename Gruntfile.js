module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            beforeconcat: ['src/**/*.js'],
            afterconcat: ['build/debug/<%= pkg.name %>_<%= pkg.version %>.js'],
            options: {
                camelcase: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                indent: false,
                latedef: true,
                newcap: true,
                noempty: true,
                plusplus: true,
                quotmark: "single",
                undef: true,
                unused: false,
                strict: false,
                trailing: true,
                maxparams: 3,
                maxdepth: 2,
                maxlen: 120,
                globalstrict: true,
                browser: true,
                evil: true,
                regexdash: true,
                predef: ['Burrows']
            },
            files: ['src/**/*.js']
        },
        concat: {
            options: {
                stripBanners: false,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: ['src/array/*.js', 'src/function/*.js', 'src/events/EventDispatcher.js'],
                dest: 'build/debug/<%= pkg.name %>_debug_<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/debug/<%= pkg.name %>_debug_<%= pkg.version %>.js',
                dest: 'build/production/<%= pkg.name %>_<%= pkg.version %>.js'
            }
        },
        docco: {
            debug: {
                src: ['docs/API.js'],
                options: {
                    output: 'docs/',
                    css: 'docs/this_docco.css'
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'src-test/**/*.js', 'docs/API.js', 'docs/this_docco.css'],
                tasks: ['jshint:beforeconcat'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-docco');

    grunt.registerTask('default', ['jshint:beforeconcat', 'concat:dist', 'jshint:afterconcat', 'uglify']);
};