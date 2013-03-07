module.exports = function(grunt) {

    grunt.initConfig({
        qunit: {
            all: {
                options: {
                    urls: [
                        'http://localhost:9000/tests/unit.html',
                        'http://localhost:9000/tests/integration.html'
                    ]
                }
            }
        },
        connect: {
            server: {
                options: {
                    port:9000,
                    base: '.'
                }
            }
        },
        uglify: {
            plugincheck: {
                files: {
                    'build/plugincheck.min.js': [
                        'lib/browserdetect.js',
                        'lib/plugindetect.js',
                        'lib/jquery-1.3.2.min.js',
                        'lib/jquery.jsonp-1.1.0.js',
                        'lib/jquery.qtip-1.0.0.js',
                        'lib/jquery.color.js',
                        'perfidies.js',
                        'messages.js',
                        'modern_browser.js',
                        'exploder.js',
                        'plugincheck_ui.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['connect', 'qunit']);
};
