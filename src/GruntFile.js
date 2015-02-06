module.exports = function(grunt) {
	var autoprefixer = require('less-plugin-autoprefix');
	var app = {
		devDest: "../dev-build/",
		prodDest: "../prod-build",
	};

	app.assetsSub = "assets/";

	app.scriptsSub = app.assetsSub + "scripts/";
	app.stylesSub = app.assetsSub + "styles/";
	app.viewsSub = app.assetsSub + "views/";
	app.fontsSub = app.assetsSub + "fonts/";
	app.imageSub = app.assetsSub + "images/";

	app.appScripts = [
		"scripts/app/app.js",
		"scripts/app/*.js",
		"scripts/app/**/*.js"
	];

	app.libScripts = [
		"scripts/lib/*.js",
		"scripts/lib/**/*.js"
	];

	app.style = "styles/style.less";
	app.styleDevDest = app.devDest + app.assets + app.scriptSub;

	app.index = "views/index.html";

	grunt.initConfig({
		concat: {
			libsDev: {
				src: app.libScripts,
				dest: app.devDest + app.assets + app.scriptSub + "lib.js",
				options: {
					sourcemap: true
				}
			},
			libsProd: {
				src: app.libScripts,
				dest: app.prodDest + app.assets + app.scriptSub + "lib.js",
			},
			appDev:{
				src: app.appScripts,
				dest: app.devDest + app.assets + app.scriptSub + "app.js",
				options: {
					sourcemap: true
				}
			},
			appProd:{
				src: app.appScripts,
				dest: app.prodDest + app.assets + app.scriptSub + "app.js",
			},
		},
		less: {
			dev: {
				options: {
					plugins: [
						new autoprefixer({browsers: ["last 2 versions"]})
					],
					sourceMap: true,
					sourceMapURL: "style.css.map",
				},
				src: app.style,
				dest: app.devDest + app.assets + app.stylesSub + "style.css",
			},
			prod: {
				options: {
					plugins: [
						autoprefixer({browsers: ["last 2 versions"]})
					],
					sourceMap: false,
				},
				src: app.style,
				dest: app.prodDest + app.assets + app.stylesSub + "style.css",
			}
		},
		targethtml: {
			dev: {
				src: app.index,
				dest: devDest
			},
			prod: {
				src: app.index,
				dest: prodDest
			}
		},
		watch: {
			styles: {
				files: ['styles/less/*'],
				tasks: ['styles'],
				options: {

				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-concat-sourcemap');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-targethtml');

	grunt.registerTask('default', ['concat:libs', 'concat_sourcemap:main', 'less:development']);
	grunt.registerTask('dev', ['concat:libs', 'concat_sourcemap:main', 'less:development']);
	grunt.registerTask('prod', ['concat:libs', 'concat:main', 'less:production']);
	grunt.registerTask('scripts', ['concat:libs', 'concat_sourcemap:main']);
	grunt.registerTask('styles', ['less:development']);
	grunt.registerTask('watch-styles', ['watch:styles']);

};