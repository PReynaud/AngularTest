var gulp = require("gulp")
	minifyCSS = require("gulp-minify-css"),
	uglify = require("gulp-uglify"),
	useref = require("gulp-useref"),
	plumber = require("gulp-plumber"),
	livereload = require("gulp-livereload"),
	sourcemaps = require("gulp-sourcemaps"),
	clean = require("gulp-clean")
	http = require("http"),
	st = require("st");

/*Global tasks*/
gulp.task("default", ["build"]);

gulp.task("build", ["html", "css", "js"]);

gulp.task("dev", ["html", "css", "js", "server"], function(){
	livereload.listen({ basePath: 'dist' });
	gulp.watch('css/*.css', ['css']);
	gulp.watch('js/*.js', ['js']);
	gulp.watch('*.html', ['html']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname + '/dist', index: 'index.html', cache: false })
  ).listen(8080, done);
});

gulp.task("clean", function(){
	return gulp.src(['dist'], {read: false})
        .pipe(clean());
});

gulp.task("html", function(){
	var assets = useref.assets();

	return gulp.src('./*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});


/*Tasks for development*/
/*gulp.task("js-dev", ["html"], function(){
	return gulp.src("dist/js/combined.js")
		.pipe(sourcemaps.init())
	    .pipe(uglify())
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest("./dist/js/"))
    	.pipe(livereload());
});

gulp.task("css-dev", ["html"], function(){
	return gulp.src("dist/css/combined.css")
		.pipe(sourcemaps.init())
	    .pipe(minifyCSS())
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest("./dist/css/"))
    	.pipe(livereload());
});*/


/*Tasks for build*/
gulp.task("js", ["html"], function(){
	gulp.src("node_modules/angular/angular.js")
		.pipe(gulp.dest("./dist/js/"));
	gulp.src("node_modules/angular-route/angular-route.js")
		.pipe(gulp.dest("./dist/js/"));

	return gulp.src("js/*.js")
	    .pipe(gulp.dest("./dist/js/"))
	    .pipe(livereload());
});

gulp.task("css", ["html"], function(){
	return gulp.src("css/*.css")
	    .pipe(gulp.dest("./dist/css/"))
	    .pipe(livereload());
});
