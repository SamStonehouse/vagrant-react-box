module.exports = function(grunt) {
	var autoprefixer = require('less-plugin-autoprefix');
	var app = {
		devDest: "build-dev/",
		prodDest: "build-prod/",
		releaseDest: "dist/"
	};

	app.assetsSub = "assets/";

	app.scriptsDest = app.assetsSub + "scripts/";
	app.stylesDest = app.assetsSub + "styles/";
	app.fontsDest = app.assetsSub + "fonts/";
	app.imageDest = app.assetsSub + "images/";

	app.viewsDest = "views/";

	app.appScripts = [
		"app/scripts/app/app.js",
		"app/scripts/app/*.js",
		"app/scripts/app/**/*.js"
	];

	app.libScripts = [
		"app/scripts/lib/*.js",
		"app/scripts/lib/**/*.js"
	];

	app.style = "app/styles/less/style.less";
	app.styles = ['app/styles/**'];
	app.index = "app/index.html";
	app.views = 'app/views/**';
	app.viewLocation = 'app/views/';
	app.assets = "app/assets/";

	grunt.initConfig({
		clean: {
			devScripts: [app.devDest + app.scriptsDest],
			devStyles: [app.devDest + app.stylesDest],
			devViews: [app.devDest + app.viewsDest],
			dev: [app.devDest],
			prod: [app.prodDest],
			release: [app.releaseDest]
		},
		copy: {
			devViews: {
				src: ['*.html'],
				dest: app.devDest + app.viewsDest,
				options: {
					expand: true,
					cwd: app.viewLocation
				}
			},
			devAssets: {
				src: [app.assets, app.views],
				dest: app.devDest + "assets/",
				options: {
					expand: true
				},
			},
			prod: {
				src: [app.assets, app.views],
				dest: app.devDest + app.assetsSub,
				options: {
					expand: true
				},
			},
			release: {
				src: [app.assets, app.views],
				dest: app.releaseDest + app.assetsSub,
				options: {
					expand: true
				},
			},
		},
		concat: {
			libsDev: {
				src: app.libScripts,
				dest: app.devDest + app.scriptsDest + "lib.js",
				options: {
					sourcemap: true
				}
			},
			libsProd: {
				src: app.libScripts,
				dest: app.prodDest + app.scriptsDest + "lib.js",
			},
			libsRelease: {
				src: app.libScripts,
				dest: app.releaseDest + app.scriptsDest + "lib.js",
			},
			appDev:{
				src: app.appScripts,
				dest: app.devDest + app.scriptsDest + "app.js",
				options: {
					sourcemap: true
				}
			},
			appProd:{
				src: app.appScripts,
				dest: app.prodDest + app.scriptsDest + "app.js",
			},
			appRelease: {
				src: app.appScripts,
				dest: app.releaseDest + app.scriptsDest + "app.js",
			}
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
				dest: app.devDest + app.stylesDest + "style.css",
			},
			prod: {
				options: {
					plugins: [
						autoprefixer({browsers: ["last 2 versions"]})
					],
					sourceMap: false,
				},
				src: app.style,
				dest: app.prodDest + app.stylesDest + "style.css",
			},
			release: {
				options: {
					plugins: [
						autoprefixer({browsers: ["last 2 versions"]})
					],
					sourceMap: false,
				},
				src: app.style,
				dest: app.releaseDest + app.stylesDest + "style.css",
			}
		},
		targethtml: {
			dev: {
				src: app.index,
				dest: app.devDest
			},
			prod: {
				src: app.index,
				dest: app.prodDest
			},
			release: {
				src: app.index,
				dest: app.releaseDest
			}
		},
		watch: {
			scripts: {
				files: app.appScripts,
				tasks: ['clean:devScripts', 'concat:appDev'],
				options: {
					livereload: 6997
				}
			},
			styles: {
				files: app.styles,
				tasks: ['clean:devStyles', 'less:dev'],
				options: {
					livereload: 6995
				}
			},
			views: {
				files: [app.views],
				tasks: ['clean:devViews', 'copy:devViews'],
				options: {
					livereload: 6996
				}
			},
		},
		bump: {
			options: {
				files: ['package.json'],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json'],
				createTag: true,
				push: true,
				pushTo: 'origin',
			}
		},
	});

	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-concat-sourcemap');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-targethtml');



	grunt.registerTask('default', ['concat:libs', 'concat_sourcemap:main', 'less:development']);

	grunt.registerTask('dev', [
		'clean:dev',
		'copy:devViews',
		'copy:devAssets',
		'concat:libsDev',
		'concat:appDev',
		'less:dev',
		'targethtml:dev'
	]);

	grunt.registerTask('prod', [
		'clean:prod',
		'copy:prod',
		'concat:libsProd',
		'concat:appProd',
		'less:prod',
		'targethtml:prod'
	]);

	grunt.registerTask('release', [
		'clean:release',
		'copy:release',
		'concat:libsRelease',
		'concat:appRelease',
		'less:release',
		'targethtml:release',
		'bump'
		]);
};