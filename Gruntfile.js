module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            dev: {
                src: [
                    'src/**/*.js', 'Gruntfile.js'
                ],
                options: {
                    jshintrc: true
                }
            }
        },
        jscs: {
            src: 'src',
            gruntfile: 'Gruntfile.js',
            options: {
                config: '.jscsrc'
            }
        },
        watch: {
            files: ['<%= jshint.dev.src %>'],
            tasks: ['dev']
        },
    });

    grunt.registerTask('dev', ['jshint', 'jscs']);
    grunt.registerTask('default', ['dev']);
};
