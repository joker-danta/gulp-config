/*
*
*
*
*/
var gulp=require('gulp'); //基础库
var less=require('gulp-less'); //编译less工具
var sass=require('gulp-sass'); //编译sass工具
var concat=require('gulp-concat'); //文件合并
var uglify=require('gulp-uglify');//压缩JS文件
var rename=require('gulp-rename');//重命名文件
//var minifyCss=require('gulp-minify-css');//最小化CSS
var imagemin=require('gulp-imagemin');//图片压缩
var autoprefixer = require('gulp-autoprefixer');//自动处理浏览器前缀

var notify=require('gulp-notify');//显示报错信息和报错后不终止当前gulp任务
var babel =require("gulp-babel");//EC6转EC5

var connect = require('gulp-connect');  //启动本地服务，并且保存自动刷新

//配置文件路径
var paths={
	src_html:"./src/**/*.html",
	src_less:"./src/css/**/*.less",
	src_css:"./src/css/**/*.css",
	src_sass:"./src/css/**/*.scss",
	src_json:"./src/**/*.json",
	src_images:"src/images/**/*",
	src_pic:"src/pic/**/*",
	src_js:"./src/js/**/*.js",
	src_text:"./src/**/*.text",

	dist:"./dist",
	dist_css:"./dist/css",
	dist_mincss:"./dist/mincss",
	dist_images:"dist/images",
	dist_html:"./dist/**/*.html",
	dist_pic:"dist/pic",
	dist_js:"./dist/js",
	dist_minjs:"./dist/minjs"
};
//style任务
gulp.task('styles',function(){

 	//编译scss 非min版本

 	gulp.src([paths.src_sass])
    .pipe(sass().on('error', sass.logError))
 	//添加浏览器前缀
 	.pipe(autoprefixer('> 1%', 'IE 7'))
 	//输出编译文件到指定文件夹
	.pipe(gulp.dest(paths.dist_css))
	//自动刷新
	.pipe(connect.reload());
	//提醒任务完成
    //.pipe(notify({ message: 'sass is OK' }))
    //编译LESS 非min版本
  gulp.src([paths.src_less])
  .pipe(less())

  //添加浏览器前缀
	.pipe(autoprefixer('> 1%', 'IE 7'))

	//输出编译文件到指定文件夹
	.pipe(gulp.dest(paths.dist_css))

		//提醒任务完成
    .pipe(notify({ message: 'less is OK' }))
		//自动刷新
		.pipe(connect.reload())

    //处理普通css  非min版本
    return gulp.src([paths.src_css])

	//输出编译文件到指定文件夹
	.pipe(gulp.dest(paths.dist_css))

	//提醒任务完成
    .pipe(notify({ message: 'css is OK' }))
		//自动刷新
		.pipe(connect.reload())
});

//javascript 非压缩任务
gulp.task('scripts',function(){
	gulp.src([paths.src_js])
	.pipe(babel({
		presets:['es2015']
	}))
	.pipe(gulp.dest(paths.dist_js)) //输出到指定文件夹
	//自动刷新
	.pipe(connect.reload())
	.pipe(notify({ message: 'Scripts is OK' })) //提醒任务完成

	//javascript 压缩任务
	gulp.src([paths.src_js])
	.pipe(babel({
		presets:['es2015']
	}))
	.pipe(uglify({
		mangle: true,		//类型：Boolean 默认：true 是否修改变量名
    compress: true	//类型：Boolean 默认：true 是否完全压缩
	}))//JS代码压缩
	.pipe(gulp.dest(paths.dist_minjs)) //输出到指定文件夹
	.pipe(notify({ message: 'Scripts min is OK' })) //提醒任务完成
});

// HTML任务
gulp.task('html', function() {
    return gulp.src([paths.src_html,paths.src_json,paths.src_text])
    .pipe(gulp.dest(paths.dist))//输出到指定文件夹
		//自动刷新
		.pipe(connect.reload())
    //提醒任务完成
    .pipe(notify({ message: 'html,json,text is OK' }))
});
//项目所用图片任务
gulp.task('images', function() {
	return gulp.src([paths.src_images])
  .pipe(gulp.dest(paths.dist_images))
  .pipe(connect.reload())
	//提醒任务完成
  .pipe(notify({ message: 'Images is OK' }))

});

//产品外观图片任务
gulp.task('pic',function(){
	return gulp.src([paths.src_pic])
	//输出到指定文件夹
	.pipe(gulp.dest(paths.dist_pic))
	.pipe(connect.reload())
	//提醒任务完成
  .pipe(notify({ message: 'pic is OK' }))
})

//监听文档
gulp.task('watch',function(){
	//监听less,sass,css
	gulp.watch([paths.src_sass,paths.src_less,paths.src_css],['styles', 'html'])
	//监听js
	gulp.watch([paths.src_js],['scripts'])
	//监听图片
	gulp.watch([paths.src_images],['images'])
	gulp.watch([paths.src_pic],['pic'])
	//监听hhtml,json,text
	gulp.watch([paths.src_html,paths.src_json,paths.src_text], function(event) {
      gulp.run('html')
  });
})

//本地服务
gulp.task('connect', function () {
	connect.server({
		port:'3333',
		livereload: true
	});
});
gulp.task('default', ['connect', 'watch']);
