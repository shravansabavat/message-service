module.exports = function (grunt) {

    grunt.initConfig({
        clean: {
            src: ['../dist', 'coverage'],
            options: {
                force: true
            }
        },

        mochaTest: {
            unittest: {
                options: {
                    reporter: 'spec',
                    captureFile: 'test/results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (default: false)
                },
                src: ['test/**/*.js']
            }
        },

        mocha_istanbul: {
            coverage: {
                src: 'test',
                options: {
                    mask: '**/*.js',
                    reportFormats: [
                        'cobertura',
                        'html'
                    ]
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', ['dist']);
    grunt.registerTask('dist', ['clean', 'coverage']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
};