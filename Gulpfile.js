/* INSTALL ALL
npm install gulp-gzip gulp-load-plugins gulp-plumber main-bower-files gulp-filter gulp-livereload gulp-jshint jshint-stylish gulp-concat gulp-strip-debug gulp-uglify gulp-sass gulp-autoprefixer gulp-minify-css gulp-htmlmin gulp-imagemin imagemin-pngquant critical --save-dev 
*/

// gulp
var gulp = require('gulp'); 
var mainBowerFiles = require('main-bower-files');
var critical = require('critical');
var pngquant = require("imagemin-pngquant");
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});
var gzip_options = { threshold: '1kb', gzipOptions: { level: 9 } };

/*
Javscripts
*/
// Files
var aScrips = ['./js/vendor/fastclick.js','./js/vendor/jquerycookie.js','./js/vendor/jquery.js','./js/vendor/placeholder.js','./js/foundation.min.js','./js/plugins/*.js','./js/default.js'];
var aScriptsCritical = ['./js/vendor/modernizr.js'];
// Tasks
gulp.task('lint', function() {
    return gulp.src('./js/default.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() {
  gulp.src(mainBowerFiles())
	.pipe(plugins.filter('*.js'))
    .pipe(plugins.concat('bower.js'))
    .pipe(gulp.dest('./js/plugins/'));
  gulp.src(aScrips)
    .pipe(plugins.plumber({ handleError: function (err) {console.log(err);this.emit('end');} }))
    .pipe(plugins.concat('scripts.js'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(plugins.livereload());
  gulp.src(aScriptsCritical)
    .pipe(plugins.uglify())
    .pipe(plugins.concat('critical.js'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(plugins.livereload());
});

gulp.task('scripts-bld', function() {
  gulp.src(aScrips)
    .pipe(plugins.plumber({ handleError: function (err) {console.log(err);this.emit('end');} }))
    .pipe(plugins.concat('scripts.js'))
    .pipe(plugins.stripDebug())
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./public/js/'))
    .pipe(plugins.gzip(gzip_options))
    .pipe(gulp.dest('./public/js/'))
    .pipe(plugins.livereload());
  gulp.src(aScriptsCritical)
    .pipe(plugins.concat('critical.js'))
    .pipe(plugins.stripDebug())
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./public/js/'))
    .pipe(plugins.gzip(gzip_options))
    .pipe(gulp.dest('./public/js/'))
    .pipe(plugins.livereload());
});

/* CSS */
var aStyles = ['./css/*.min.css','./css/plugins/*.css','./css/styles.css'];
gulp.task('sass', function () {
    gulp.src('./scss/styles.scss')
		.pipe(plugins.plumber({ handleError: function (err) {console.log(err);this.emit('end');} }))
        .pipe(plugins.sass())
        .pipe(gulp.dest('./css'));
});
gulp.task('styles', function() {
  gulp.src(mainBowerFiles())
	.pipe(plugins.filter('*.css'))
    .pipe(plugins.concat('./css/plugins/bower.css'));
  gulp.src(aStyles)
    .pipe(plugins.plumber({ handleError: function (err) {console.log(err);this.emit('end');} }))
    .pipe(plugins.concat('styles.min.css'))
    .pipe(plugins.autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('./public/css/'))
    .pipe(plugins.gzip(gzip_options))
    .pipe(gulp.dest('./public/css/'))
    .pipe(plugins.livereload());
});

/* HTML */
var aHtml = ['./assets/*.html','./assets/*.php'];
gulp.task('html', function() {
  return gulp.src(aHtml)
    .pipe(plugins.plumber({ handleError: function (err) {console.log(err);this.emit('end');} }))
    .pipe(gulp.dest('./public/'))
    .pipe(plugins.livereload());
});
gulp.task('htmlbuild', function() {
  return gulp.src(aHtml)
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public/'))
    .pipe(plugins.livereload());
});

gulp.task('critical', function () {
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

/* Images / Files */
var aImages = ['./img/*.gif','./img/*.png','./img/*.jpeg','./img/*.jpg','./img/*.svg'];
gulp.task('files', function () {
    return gulp.src(aImages)
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./public/img/'));
});

gulp.task('default', ['lint', 'scripts', 'sass', 'styles', 'html'], function() { 
  plugins.livereload.listen();
  gulp.watch(aScrips, ['scripts','lint']).on('change', plugins.livereload.changed);
  gulp.watch('./scss/*.scss', ['sass']); // compile Sass on change
  gulp.watch(aStyles, ['styles']).on('change', plugins.livereload.changed);
  gulp.watch(aHtml, ['html']).on('change', plugins.livereload.changed);
});
gulp.task('build', ['scripts-bld', 'sass', 'styles', 'htmlbuild', 'files', 'critical']);