var gulp         = require('gulp');
var sass         = require('gulp-sass');
var plumber      = require("gulp-plumber"); //watch解除を停止する
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps   = require('gulp-sourcemaps');
var notify       = require('gulp-notify');
var babel        = require('gulp-babel');
var concat       = require('gulp-concat');
//var riot         = require('gulp-riot');
//var riot = require('riot')





// ディレクトリ設定
var dir = {
	src: '_src', // _srcフォルダ置き換え
	dist: 'dist' // destフォルダ置き換え
};

//copyタスクのソース
var copySource = [

	// ディリクトリ直下の全てのファイルをコピーする
	dir.src + '/*',

	// コピー元をそのまま全てコピーする場合は以下の記述
	// dir.src + '/**/'

	// 上記の*(アスタリスク)を使った指定はディリクトリも対象となるので、コピーしないディリクトリを別途指定する
	'!' + dir.src + '/_sass/',
	'!' + dir.src + '/_bable/',
	'!' + dir.src + '/_riot/',
	'!' + dir.src + '/_spinkit/',
	'!' + dir.src + '/_bootstrap-sass/',

	// コピーするディリクトリとその下層にある全てのファイルを指定する
	dir.src + '/css/**/',
	dir.src + '/fonts/**/',
	dir.src + '/images/**/',
	dir.src + '/inc/**/',
	dir.src + '/js/**/*.js',
	dir.src + '/js/**/*.map',
	dir.src + '/languages/**/',
	dir.src + '/plugin/**/',

];

// gulp.task('riot', ()=> {
// 	gulp.src(dir.src + '/_riot/riot_tag.tag')
// 		.pipe(riot())
// 		.pipe(gulp.dest(dir.src +'/js/'));
// 	});

//sassファイル監視対象指定
var watchSass = [
	dir.src + '/_sass/**/*.scss',
//	'/_spinkit/scss/_spinkit.scss',
	'!' + dir.src + '/_sass/' + '_spinkit/css/*.css',
	'/_bootstrap-sass/assets/stylesheets/_bootstrap.scss'
]

// デスクトップにエラー通知を出す
var errorOpt = {
	errorHandler: notify.onError('Error: [エラー発生!] <%= error %>')
};

//指定したディリクトリのsassファイルを指定したディリクトリにコンパイルする
gulp.task('sass', function() {
	gulp.src(watchSass)
		.pipe(plumber(errorOpt))
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(autoprefixer("last 3 version"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dir.src));
});

gulp.task('bable', function() {
	gulp.src(dir.src + '/_bable/*.js')
		.pipe(plumber(errorOpt))
		.pipe(sourcemaps.init())
		.pipe(babel({presets: ['es2015']}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dir.src + '/js/'));
});

//指定したファイルをコピーする
gulp.task('copy', function() {
	return gulp.src(copySource,{base: dir.src}) //,{base: dir.src}と記述するとコピー元のディリクトリ構造を維持する
			   .pipe(gulp.dest( dir.dist ));
});

//指定したjsフィアルを結合し、jsディリクトリにコピーする
// gulp.task('concat-js', function() {
// 	var files = ['node_modules/riot/riot+compiler.js'];
// 	gulp.src(files)
// 		.pipe(concat('app.js'))
// 		.pipe(gulp.dest(dir.src + '/js/'))
// 	;
// });

//指定したディリクトリ、ファイルを監視してタスクを実行する
gulp.task('watch', function() {
	gulp.watch(watchSass, ['sass']);
	gulp.watch( dir.src + '/_bable/*.js', ['bable']);
//	gulp.watch( dir.src + '/_riot/riot_tag.tag', ['riot']);
	gulp.watch(copySource,['copy']);
});