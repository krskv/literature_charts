var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		chalk 			 = require('chalk'),
    pug          = require('gulp-pug'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify'),
		imagemin 		 = require('gulp-imagemin'),
		addsrc 			 = require('gulp-add-src'),
		mozjpeg 		 = require('imagemin-mozjpeg'),
		gifsicle 		 = require('imagemin-gifsicle'),
		svgo				 = require('imagemin-svgo'),
		pngquant 		 = require('imagemin-pngquant');

gulp.task('browser-sync', ['styles-main','styles-critical','scripts', 'pug'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false
		});
		
});

gulp.task('img', function () {
  gulp.src(['dev/img/*'])
    .pipe(imagemin([
            gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            mozjpeg({progressive: true}),
            imagemin.optipng({optimizationLevel: 7}),
            pngquant({quality: '85-100'}),
            svgo()
        ]))
    .pipe(gulp.dest('app/img'))
    // .on('error', imagemin.logError)
    .pipe(browserSync.stream());
});


gulp.task('styles-main', function () {
	return gulp.src('dev/sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(addsrc('dev/libs/css/*.css'))
	.pipe(minifycss())
	// .pipe(concat('main.min.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});


gulp.task('styles-critical', function () {
	return gulp.src('dev/sass/critical/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(addsrc('dev/libs/ctitical-css/*.css'))
	.pipe(minifycss())
	.pipe(concat('critical.min.css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});



gulp.task('pug', function() {
	return gulp.src('dev/pug/*.pug')
	.pipe(pug({
    pretty: true
  }).on('error', function(err) {
      console.log(err);
	}))
	.pipe(gulp.dest('app'));
});

gulp.task('scripts', function() {
	return gulp.src(['./dev/js/*.js'])
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(addsrc('dev/libs/js/*.js'))
		.pipe(gulp.dest('./app/js/'));
});

gulp.task('watch', function () {
	gulp.watch('dev/sass/*.sass', ['styles-main']);
	gulp.watch('dev/sass/critical/*.sass', ['styles-critical']);
	gulp.watch('dev/pug/**/*.pug', ['pug']);
	gulp.watch('dev/js/**/*.js', ['scripts']);
	gulp.watch('dev/img/**', ['img']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch','img']);
