module.exports = function(grunt) {

    grunt.initConfig({
        min: {
            dist: {
                src: [
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
                ],
                dest: 'build/plugincheck.min.js'
            }
        }
    });
};
