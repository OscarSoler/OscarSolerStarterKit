'use strict';

/**
	Dependecias del Proyecto 
*/

var gulp 		 = require('gulp'),
	postcss		 = require('gulp-postcss'),
	browserSync  = require('browser-sync'),
	reload 		 = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
	jade 		 = require('gulp-jade'),
	stylus 		 = require('gulp-stylus');  



//Tarea para compilar los archivos Jade a html 

gulp.task('jade2html',function(){

	gulp.src('Jade/*.jade')
	.pipe(jade())
	.pipe(gulp.dest('dist/'))
	.pipe(reload({ stream:true }));;

});

// Tarea para compilar los archivos stylus a css

gulp.task('stylus2css', function(){	

	gulp.src('Stylus/main.styl')
		.pipe(stylus( {compress:true} ))
		.pipe(gulp.dest('dist/css/'))
		.pipe(reload({ stream:true }));
});


// Tarea para colocarle los prefijos de los navegadores a las propiedades css

gulp.task('autoprefixer', function(){
	gulp.src('dist/css/main.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist/css/'));
});


gulp.task('serve', ['stylus2css','jade2html'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('Stylus/*.styl', ['stylus2css']);
  gulp.watch('Modulos/*/*.styl', ['stylus2css']);

  gulp.watch('Jade/*.jade', ['jade2html']);
  gulp.watch('Modulos/*/*.jade', ['jade2html']);

});




