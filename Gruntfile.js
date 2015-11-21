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

        // Remueve define wrappers, closure ends, and declaraciones vacias
        contents = contents
            .replace(/define\([^{]*?{/, '')
            .replace(/\}\s*?\);[^}\w]*$/, '');

        // Remueve cualquier cosa wrapped con
        // /* ExcludeStart */ /* ExcludeEnd */
        // o simple lineas despues de // BuildExclude comment
        contents = contents
            .replace(/\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, '')
            .replace(/\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, '');

        // Remueve definiciones vacias
        contents = contents
            .replace(/define\(\[[^\]]*\]\)[\W\n]+$/, '');

        return contents;
    }

    // Parser
    grunt.task.registerTask('parser', 'Remueve un salto de linea cuando encuentre dos seguidos', function() {
        var contents = grunt.file.read('dist/axedia.js');

        // Remuve saltos de linea multiple
        contents = contents.replace(/\n{2,}/g, '');

        // Remueve saltos de linea entre declaraciones de variables;
        contents = contents.replace(/(var.[^;]*;)\s+\n(?=\s*var)/g, '$1\n');

        grunt.file.write('dist/axedia.js', contents);
    });

    grunt.registerTask('dev', ['jshint', 'jscs', 'requirejs', 'parser', 'watch']);
    grunt.registerTask('all', ['requirejs:all']);
    grunt.registerTask('default', ['dev']);
};
