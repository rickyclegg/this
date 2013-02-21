module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['src/**/*.js', 'src-test/**/*.js', 'docs/API.js', 'docs/this_docco.css'],
                tasks: ['lint:beforeconcat'],
                options: {
                    interrupt: true
                }
            }
        },
        lint: {
            beforeconcat: ['src/**/*.js'],
            afterconcat: ['build/debug/<%= pkg.name %>_<%= pkg.version %>.js']
        },
        jshint: {
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
                regexdash: true
            },
            files: ['src/**/*.js']
        },
        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> - ' +
                'Author: <%= pkg.author.name %> || <%= pkg.author.email %> */'
        },
        concat: {
            debug: {
                src: ['<banner>', 'src/array/*.js', 'src/function/*.js', 'src/events/EventDispatcher.js'],
                dest: 'build/debug/<%= pkg.name %>_debug_<%= pkg.version %>.js'
            }
        },
        min: {
            production: {
                src: ['<banner>', 'build/debug/<%= pkg.name %>_debug_<%= pkg.version %>.js'],
                dest: 'build/production/<%= pkg.name %>_<%= pkg.version %>.js'
            }
        },
        uglify: {
            mangle: {toplevel: true},
            squeeze: {dead_code: false},
            codegen: {quote_keys: true}
        },
        jstestdriver: {
            start_and_run: {
                browser: "/Applications/Firefox.app/Cotents/MacOS/firefox"
            },
            run_tests: {},
            options: {
                port: "9876",
                config: ["src-test/unit/jsTestDriver_unit.conf"],
                tests: "all"
            }
        },
        jsdoc : {
            dist : {
                src: ['src/**/*.js'],
                dest: 'docs/jsDoc'
            }
        },
        docco: {
            debug: {
                src: 'docs/API.js',
                dest: 'docs/docco/',
                css: 'docs/this_docco.css'
            }
        },
        shell: {
            git_commit: {
                command: "git commit -a -m 'Test Grunt commit'",
                stdout: true,
                failOnError: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-jstestdriver');
    grunt.loadNpmTasks('grunt-docco');

    grunt.registerTask('default', 'lint:beforeconcat concat:debug lint:afterconcat jstestdriver:run_tests min:production');
};