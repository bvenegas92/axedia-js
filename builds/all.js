module.exports = function(grunt) {
    var requirejs = require('requirejs');
    var fs = require('fs');
    var config = {
        baseUrl: 'src',
        name: 'axedia',
        out: 'dist/axedia.js',

        // We have multiple minify steps
        optimize: 'none',

        // Include dependencies loaded with require
        findNestedDependencies: true,

        // Avoid inserting define() placeholder
        skipModuleInsertion: true,

        // Avoid breaking semicolons inserted by r.js
        skipSemiColonInsertion: true,

        //onBuildWrite: build
    };

    grunt.registerTask('all', function() {
        requirejs.optimize(config, function(buildResponse) {
            //buildResponse is just a text output of the modules
            //included. Load the built file for the contents.
            //Use config.out to get the optimized file contents.
            //var contents = fs.readFileSync(config.out, 'utf8');
        }, function(err) {
            //optimization err callback
        });
        //var args = this.args,
            //modules = args.length ? args[ 0 ].replace( /,/g, ":" ) : "";

        grunt.log.writeln( "Creating custom build...\n" );

        //grunt.task.run( [ "build:*:*" + ( modules ? ":" + modules : "" ), "uglify", "dist" ] );
    } );
};
