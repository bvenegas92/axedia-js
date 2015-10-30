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
    });

    grunt.loadTasks('builds');

    grunt.registerTask('dev', ['jshint', 'jscs', 'watch']);
    grunt.registerTask('default', ['dev']);
};
