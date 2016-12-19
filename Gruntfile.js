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
            axd: {
                files: [
                    'src/**/*.js',
                    '!src/tmp_builder.js',
                    'Gruntfile.js'
                ],
                tasks: ['style', 'build', 'karma:dev:run']
            },
            test: {
                files: ['test/**/*.js'],
                tasks: ['karma:dev:run']
            }
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

    function removeSpaces(file) {
        var contents = grunt.file.read(file); // archivo a editar
        // Remuve saltos de linea multiple
        contents = contents.replace(/\n{2,}/g, '');
        // Remueve saltos de linea entre declaraciones de variables;
        contents = contents.replace(/(var.[^;]*;)\s+\n(?=\s*var)/g, '$1\n');
        grunt.file.write(file, contents);
    }

    // custom builder
    grunt.task.registerTask('build', 'Genera un build con la ruta del archivo json proporcionado', function(subtask) {
        subtask = subtask || 'create';
        var fileName = grunt.option('file') || 'axedia',
        config = grunt.file.readJSON('builds/' + fileName + '.json'),
        modules = config.modules,
        dependencies = [],
        i;

        if (subtask === 'create') {
            dependencies = modules.map(function(item) {
                if (/^(src\/|\.\/)/.test(item)) {
                    return item.replace(/^(src\/|\.\/)/, "./");
                } else {
                    return "./" + item;
                }
            });
            dependencies = dependencies.map(function(item) { return '"' + item + '"'; });
            grunt.file.write('src/tmp_builder.js', 'define([' + dependencies.join(',') + ']);');
            grunt.task.run('build:compile');
        } else if (subtask === 'compile') {
            // cambia la config del task requirejs para que se ejecute con el archivo temporal creado
            grunt.config('requirejs.dev.options.out', 'dist/' + config.name);
            grunt.config('requirejs.dev.options.name', 'tmp_builder');
            grunt.task.run(['requirejs', 'build:delete']);
        } else if (subtask === 'delete') {
            // remueve saltos de linea multiples y elimina el archivo temporal
            removeSpaces('dist/' + config.name);
            grunt.file.delete('src/tmp_builder.js');
        }
    });

    grunt.registerTask('style', ['jshint', 'jscs']); // estilo y validación del codigo
    grunt.registerTask('dev', ['style', 'build', 'karma:dev:start','watch']); // desarrollo
    grunt.registerTask('default', ['dev']);
};
