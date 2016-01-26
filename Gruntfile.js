module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            controllers: {
                src: ['client/assets/controllers/*.js'],
                dest: 'server/public/assets/controllers.min.js'
            },
            factories: {
                src:['client/assets/factories/*.js'],
                dest: 'server/public/assets/factories.min.js'
            }
        },
        copy: {
            vendor: {
                expand: true,

                // VENDORS

                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular-animate/angular-animate.min.js",
                    "angular-animate/angular-animate.min.js.map",
                    "angular-aria/angular-aria.min.js",
                    "angular-aria/angular-aria.min.js.map",
                    "angular-material/angular-material.min.js",
                    "angular-material/angular-material.min.js.map",
                    "angular-material/angular-material.min.css",
                    "angular-material/angular-material.layouts.min.css",
                    "angular-messages/angular-messages.min.js",
                    "angular-messages/angular-messages.min.js.map",
                    "angular-route/angular-route.min.js",
                    "angular-route/angular-route.min.js.map",
                    "angular-ui-grid/ui-grid.min.css",
                    "angular-ui-grid/ui-grid.min.js"
                ],
                "dest": "server/public/vendors/"
            },

            font: {
                expand: true,
                cwd: "node_modules/angular-ui-grid/",
                src: ["ui-grid.ttf", "ui-grid.woff"],
                "dest": "server/public/vendors/angular-ui-grid/"
            },


            css: {
                // STYLES
                expand: true,
                cwd: "client/styles/",
                src: "style.css",
                "dest": "server/public/styles"
            },

            html: {
                // VIEWS
                expand: true,
                cwd: "client/views/",
                src: "**",
                "dest": "server/public/views"
            },

            scripts: {
                // SCRIPTS
                expand: true,
                cwd: "client/assets/",
                src: ["*.js"],
                "dest": "server/public/assets"
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify']);

};