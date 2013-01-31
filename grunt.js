module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: 'src/Extend.js',
                tasks: ['concat lint'],
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
            browser: "/Applications/Firefox.app/Contents/MacOS/firefox",
            config: "src-test/unit/jsTestDriver.conf",
            port: "9876",
            tests: "all"
        },
        shell: {
            git_commit: {
                command: "git commit -a -m 'First grunt commit'",
                stdout: true,
                failOnError: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-jstestdriver');

    grunt.registerTask('default', 'concat lint min jstestdriver');

};