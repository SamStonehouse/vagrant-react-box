module.exports = function(grunt) {
	var autoprefixer = require('less-plugin-autoprefix');
	var app = {
		devDest: "build-dev/",
		prodDest: "build-prod/",
		releaseDest: "dist/",
		tempDest: "temp/"
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
				expand: true,
				cwd: app.viewLocation
			},
			devAssets: {
				src: ['*'],
				dest: app.devDest + "assets/",
				expand: true,
				cwd: app.assets
			},
			devScripts: {
				src: ['*.js'],
				dest: app.devDest + app.scriptsDest,
				expand: true,
				cwd: app.tempDest
			}
			prodViews: {
				src: ['*.html'],
				dest: app.prodDest + app.viewsDest,
				expand: true,
				cwd: app.viewLocation
			},
			prodAssets: {
				src: ['*'],
				dest: app.prodDest + "assets/",
				expand: true,
				cwd: app.assets
			},
			prodScripts: {
				src: ['*.js'],
				dest: app.prodDest + app.scriptsDest + "lib.js",
				expand: true,
				cwd: app.asstempDestets
			}
			releaseViews: {
				src: ['*.html'],
				dest: app.releaseDest + app.viewsDest,
				expand: true,
				cwd: app.viewLocation
			},
			releaseAssets: {
				src: ['*'],
				dest: app.releaseDest + "assets/",
				expand: true,
				cwd: app.assets
			},
			releaseScripts: {
				src: ['*.js'],
				dest: app.releaseDest + app.scriptsDest;
				expand: true,
				flatten: true,
				cwd: app.tempDest
			}
		},
		react: {
			libs: {
				src: app.libScripts,
				dest: app.devDest + app.scriptsDest + "lib.js",
				options: {
					sourcemap: true
				}
			},
			app:{
				src: app.appScripts,
				dest: app.devDest + app.scriptsDest + "app.js",
				options: {
					sourcemap: true
				}
			},
		},
		jshint: {
			all: ['Gruntfile.js', app.tempDest + 'app.js'],
			options: {
				reporter: require('jshint-stylish'),
				jshintrc: '.jshintrc',
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
	//grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-concat-sourcemap');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-targethtml');

	grunt.registerTask('default', ['concat:libs', 'concat_sourcemap:main', 'less:development']);

	grunt.registerTask('dev', [
		'clean:dev',
		'react:libs',
		'react:app',
		'jshint',
		'copy:devViews',
		'copy:devAssets',
		'copy:devScripts',
		'less:dev',
		'targethtml:dev'
	]);

	grunt.registerTask('prod', [
		'jshint',
		'clean:prod',
		'react:libs',
		'react:app',
		'jshint',
		'copy:prodViews',
		'copy:prodAssets',
		'copy:prodScripts',
		'less:prod',
		'targethtml:prod'
	]);

	grunt.registerTask('release', [
		'clean:release',
		'react:libs',
		'react:app',
		'jshint',
		'copy:releaseViews',
		'copy:releaseAssets',
		'copy:releaseScripts',
		'less:release',
		'targethtml:release',
		'bump'
	]);
};