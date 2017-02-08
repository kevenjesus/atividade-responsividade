/* Importação de modulos */
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var htmlmin = require('gulp-htmlmin');

/* Diretórios monitorados */
var path_css = './source/scss/style.scss';
var path_html = './source/**/*.html';

/* Tarefa: Compila o SASS e Minifica o CSS */
gulp.task('compilar-sass', function() {
	return gulp.src(path_css)
		.pipe(sass())
		.on('error', notify.onError({title: 'Erro ao compilar', message: '<%= error.message %>'}))
		.pipe(gulp.dest('./dist/css'));
});

/* Tarefa: Minifica todos os arquivos HTML */
gulp.task('minificar-html', function() {
	return gulp.src(path_html)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./dist'));
});

/* Tarefa: Rotina de background que monitora diretórios e executa suas tarefas a cada alteração realizada */
gulp.task('background', function() {
	gulp.watch('./source/scss/**/*.scss', ['compilar-sass']);
	gulp.watch(path_html, ['minificar-html']);
});