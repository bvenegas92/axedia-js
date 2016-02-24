module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: { // validacion de codigo
            dev: {
                src: [
                    'src/**/*.js', 'Gruntfile.js'
                ],
                options: {
                    jshintrc: true
                }
            }
        },
        jscs: { // estilo de codigo
            src: 'src',
            gruntfile: 'Gruntfile.js',
            options: {
                config: '.jscsrc'
            }
        },
        watch: { // observar cambios en codigo
            files: [
                'src/**/*.js',
                'Gruntfile.js',
                'test/**/*.js'
            ],
            tasks: ['style', 'compile', 'karma:dev:run']
        },
        requirejs: { // compilacion
            dev: {
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
        },
        karma: { // testing
            dev: {
                options: {
                    configFile: 'karma.conf.js',
                    background: true,
                    singleRun: false
                }
            }
        }
    });

    // Convierte los archivos concatenados con RequireJS
    function convert(name, path, contents) {
        // Remueve `return` y `exports`
        contents = contents
            .replace(/\s*return\s+[^\}]+(\}\s*?\);[^\w\}]*)$/, '$1')
            .replace(/\s*exports\.\w+\s*=\s*\w+;/g, '');

        // Remueve define wrappers, closure ends y declaraciones vacias
        contents = contents
            .replace(/define\([^{]*?{/, '')
            .replace(/\}\s*?\);[^}\w]*$/, '');

        // Remueve definiciones vacias
        contents = contents
            .replace(/define\(\[[^\]]*\]\)[\W\n]+$/, '');

        return contents;
    }

    // Elimina espacios innecesarios en la compilacion
    grunt.task.registerTask('removeSpaces', 'Remueve un salto de linea cuando encuentre dos seguidos', function() {
        var contents = grunt.file.read('dist/axedia.js'); // archivo a editar

        // Remuve saltos de linea multiple
        contents = contents.replace(/\n{2,}/g, '');

        // Remueve saltos de linea entre declaraciones de variables;
        contents = contents.replace(/(var.[^;]*;)\s+\n(?=\s*var)/g, '$1\n');

        grunt.file.write('dist/axedia.js', contents);
    });

    grunt.registerTask('style', ['jshint', 'jscs']); // estilo y validación del codigo
    grunt.registerTask('compile', ['requirejs', 'removeSpaces']); // compilacion y formateo de archivos
    grunt.registerTask('dev', ['style', 'compile', 'karma:dev:start','watch']); // desarrollo
    grunt.registerTask('default', ['dev']);
};
