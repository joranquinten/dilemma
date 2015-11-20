// gulp
require('es6-promise').polyfill();
var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var critical = require('critical');
var pngquant = require("imagemin-pngquant");
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = require("gulp-load-plugins")({ pattern: ['gulp-*', 'gulp.*'], replaceString: /\bgulp[\-.]/ });
var gzip_options = { threshold: '1kb', gzipOptions: { level: 9 } };
var browserSync = require("browser-sync");

// Testing plugins
var karmaServer = require('karma').Server;
var protractor = require("gulp-protractor").protractor;

// Files
var aScrips = ['./js/vendor/fastclick.js','./js/vendor/jquerycookie.js','./js/vendor/jquery.js','./js/vendor/placeholder.js','./js/foundation.min.js','./js/plugins/*.js','./js/default.js'];
var aScriptsCritical = ['./js/vendor/modernizr.js'];
var aStyles = ['./css/*.min.css','./css/plugins/*.css','./css/styles.css'];
var aHtml = ['./assets/**/*.{html,php}'];
var aImages = ['./img/**/*.{gif,png,jpeg,jpg,svg}'];

var reload      = browserSync.reload;

/* **************************************************
GLOBAL
************************************************** */

	gulp.task('lint', function() {
		return gulp.src('./js/default.js')
			.pipe(plugins.jshint())
			.pipe(plugins.jshint.reporter('jshint-stylish'));
	});

	gulp.task('sass', function () {
		gulp.src('./scss/styles.scss')
			.pipe(plugins.plumber({ handleError: function (err) {console.log(err);this.emit('end');} }))
			.pipe(plugins.sass())
			.pipe(gulp.dest('./css'));
	});

/* **************************************************
TESTING
************************************************** */

gulp.task('unit', function(done){

  console.log('Starting unit tests. Note that this follow a watch pattern on testfiles, press Ctrl+C to quit.');

  		  new karmaServer({
  		    configFile: __dirname + '/tests/unit.karma.conf.js',
  		    singleRun: false
  		  }, done).start();

});

gulp.task('e2e', function(){

  gulp.src(['tests/e2e/**/*.js'])
      .pipe(protractor({
          configFile: __dirname + '/tests/e2e.protractor.conf.js',
          args: ['--baseUrl', 'http://127.0.0.1:8000']
      }))
      .on('error', function(err) {
        this.emit('end'); //instead of erroring the stream, end it
      });

  console.log('Starting end to end tests. Note that this starts up a browser and could take a while, press Ctrl+C to quit.');
});

/* **************************************************
DEVELOPMENT
************************************************** */

	gulp.task('scripts', function() {
	  gulp.src(mainBowerFiles())
		.pipe(plugins.filter('*.js'))
		.pipe(plugins.concat('bower.js'))
		.pipe(gulp.dest('./js/plugins/'));
	  gulp.src(aScrips)
		.pipe(plugins.plumber({ handleError: function (err) {console.log(err);this.emit('end');} }))
		.pipe(plugins.concat('scripts.js'))
		.pipe(gulp.dest('./public/js/'))
    .pipe(reload({stream: true}));

	  gulp.src(aScriptsCritical)
		.pipe(plugins.uglify())
		.pipe(plugins.concat('critical.js'))
		.pipe(gulp.dest('./public/js/'))
		.pipe(gulp.dest('./public/js/'))
    .pipe(reload({stream: true}));
	});

	gulp.task('styles', function() {
	  gulp.src(mainBowerFiles())
		.pipe(plugins.filter('*.css'))
		.pipe(plugins.concat('./css/plugins/bower.css'));
	  gulp.src(aStyles)
		.pipe(plugins.plumber({ handleError: function (err) {console.log(err);this.emit('end');} }))
		.pipe(plugins.autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'))
		.pipe(plugins.concat('styles.min.css'))
		.pipe(gulp.dest('./public/css/'))
		.pipe(reload({stream: true}));
	});

	gulp.task('html', function() {
	  return gulp.src(aHtml)
		.pipe(plugins.plumber({ handleError: function (err) {console.log(err);this.emit('end');} }))
		.pipe(gulp.dest('./public/'))
		.pipe(reload({stream: true}));
	});


/* **************************************************
BUILD
************************************************** */

	gulp.task('scripts-bld', function() {
	  gulp.src(aScrips)
		.pipe(plugins.plumber({ handleError: function (err) {console.log(err);this.emit('end');} }))
		.pipe(plugins.concat('scripts.js'))
		.pipe(plugins.stripDebug())
		.pipe(plugins.uglify())
		.pipe(gulp.dest('./build/js/'))
		.pipe(plugins.gzip(gzip_options))
		.pipe(gulp.dest('./build/js/'));

	  gulp.src(aScriptsCritical)
		.pipe(plugins.concat('critical.js'))
		.pipe(plugins.stripDebug())
		.pipe(plugins.uglify())
		.pipe(gulp.dest('./build/js/'))
		.pipe(plugins.gzip(gzip_options))
		.pipe(gulp.dest('./build/js/'));
	});

	gulp.task('html-bld', function() {
	  return gulp.src(aHtml)
		.pipe(plugins.htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./build/'));
	});

	gulp.task('styles-bld', function() {
	  gulp.src(mainBowerFiles())
		.pipe(plugins.filter('*.css'))
		.pipe(plugins.concat('./css/plugins/bower.css'));

	  gulp.src(aStyles)
		.pipe(plugins.plumber({ handleError: function (err) {console.log(err);this.emit('end');} }))
		.pipe(plugins.autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'))
		.pipe(plugins.concat('styles.min.css'))
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest('./build/css/'))
		.pipe(plugins.gzip(gzip_options))
		.pipe(gulp.dest('./build/css/'));
	});

	gulp.task('critical-bld', function () {
		critical.generateInline({
			base: 'public/',
			src: 'index.html',
			styleTarget: 'css/styles.critical.css',
			htmlTarget: 'index.critical.html',
			width: 320,
			height: 480,
			minify: true
		});
	});

	gulp.task('files-bld', function () {
		return gulp.src(aImages)
			.pipe(plugins.imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest('./build/img/'));
	});


/* **************************************************
INSTRUCTIONS
************************************************** */

gulp.task('default', ['lint', 'scripts', 'sass', 'styles', 'html', 'serve'], function() {
	  gulp.watch(aScrips, ['scripts','lint']).on('change', browserSync.reload);
	  gulp.watch('./scss/*.scss', ['sass']);
	  gulp.watch(aStyles, ['styles']).on('change', browserSync.reload);
	  gulp.watch(aHtml, ['html']).on('change', browserSync.reload);
});

gulp.task('serve', function(){
  // Assumes you have a local webserver running and content is accessible via localhost by default
  browserSync.init({server: false, proxy: 'localhost/'+ currentDir() +'/public', browser: ['chrome'] });

  // Use static server:
  // browserSync.init({server: { baseDir: './' }, browser: config.plugins.browserSync.browsers });

});

	gulp.task('default-bld', ['lint', 'scripts', 'sass', 'styles', 'html']);
	gulp.task('build', ['scripts-bld', 'sass', 'styles-bld', 'html-bld', 'files-bld', 'critical-bld']);

	/* Other helpers */
	function currentDir(){
	  if (__dirname) return __dirname.split('\\').pop();
	}
