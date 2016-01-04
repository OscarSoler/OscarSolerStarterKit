'use strict';

/**
	Dependecias del Proyecto 
*/

var gulp 		 = require('gulp'),
	browserSync  = require('browser-sync'),
	reload 		 = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
	plumber 	 = require('gulp-plumber'),
	jade 		 = require('gulp-jade'),
	notify		 = require('gulp-notify'),
	stylus 		 = require('gulp-stylus');  



//Tarea para compilar los archivos Jade a html 

gulp.task('jade2html',function(){

	gulp.src('Jade/*.jade')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(jade())
		.pipe(reload({ stream:true }))
		.pipe(gulp.dest('dist/'))
		.pipe(notify( {title:'Jade',message:'Compliación exitosa'} ));;

});

// Tarea para compilar los archivos stylus a css

gulp.task('stylus2css', function(){	

	gulp.src('Stylus/main.styl')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(stylus( {compress:true}))
		.pipe(reload({ stream:true }))
		.pipe(gulp.dest('dist/css/'))
		.pipe(notify( {title:'Stylus',message:'Compliación exitosa'} ));
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



// Tarea para crear un servidor y actualizar automaticamnete cuando hallan cambios en los arhivos

gulp.task('serve', ['stylus2css','jade2html'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });

  gulp.watch('Stylus/*.styl', ['stylus2css']);
  gulp.watch('Modulos/*/*.styl', ['stylus2css']);

  gulp.watch('Jade/*.jade', ['jade2html']);
  gulp.watch('Modulos/*/*.jade', ['jade2html']);

  gulp.watch('dist/css/main.css',['autoprefixer']);
  
});


gulp.task('default', ['serve']);




