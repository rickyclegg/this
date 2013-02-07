module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: 'src/Extend.js',
                tasks: ['concat', 'lint', 'jstestdriver:run_tests'],
                options: {
                    interrupt: true
                }
            }
        },
        lint: {
            files: ['build/debug/<%= pkg.name %>_debug_<%= pkg.version %>.js']
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
                quotmark: "double",
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
            files: ['build/debug/<%= pkg.name %>_debug_<%= pkg.version %>.js']
        },
        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        concat: {
            debug: {
                src: ['src/Extend.js'],
                dest: 'build/debug/<%= pkg.name %>_debug_<%= pkg.version %>.js'
            }
        },
        min: {
            production: {
                src: ['build/debug/<%= pkg.name %>_debug_<%= pkg.version %>.js'],
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

    grunt.registerTask('default', 'lint concat:debug jstestdriver:run_tests shell:git_commit');
};