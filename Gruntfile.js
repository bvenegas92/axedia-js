module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            dev: {
                src: [
                    'src/**/*.js', 'Gruntfile.js', 'builds/**/*.js'
                ],
                options: {
                    jshintrc: true
                }
            }
        },
        jscs: {
            src: 'src',
            gruntfile: 'Gruntfile.js',
            builds: 'builds/**/*.js',
            options: {
                config: '.jscsrc'
            }
        },
        watch: {
            files: ['<%= jshint.dev.src %>'],
            tasks: ['dev']
        },
        requirejs: {
            all: {
                options: {
                    baseUrl: 'src',
                    name: 'axedia',
                    out: 'dist/axedia.js',
                    optimize: 'none',
                    wrap: {
                        startFile: 'src/intro.js',
                        endFile: 'src/outro.js'
                    },
                    findNestedDependencies: true,
                    skipModuleInsertion: true,
                    skipSemiColonInsertion: true,
                    onBuildWrite: convert
                }
            }
        }
    });

    function convert(name, path, contents) {
        contents = contents
            .replace(/\s*return\s+[^\}]+(\}\s*?\);[^\w\}]*)$/, '$1')
            // Multiple exports
            .replace(/\s*exports\.\w+\s*=\s*\w+;/g, '');

        // Remove define wrappers, closure ends, and empty declarations
        contents = contents
            .replace(/define\([^{]*?{/, '')
            .replace(/\}\s*?\);[^}\w]*$/, '');

        // Remove anything wrapped with
        // /* ExcludeStart */ /* ExcludeEnd */
        // or a single line directly after a // BuildExclude comment
        contents = contents
            .replace(/\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, '')
            .replace(/\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, '');

        // Remove empty definitions
        contents = contents
            .replace(/define\(\[[^\]]*\]\)[\W\n]+$/, '');

        return contents;
    }

    grunt.registerTask('dev', ['jshint', 'jscs', 'requirejs', 'watch']);
    grunt.registerTask('all', ['requirejs:all']);
    grunt.registerTask('default', ['dev']);
};
