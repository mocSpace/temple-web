/**
 * gulp配置文件,引入gulp及各种组件;
 */
var gulp = require('gulp'),
    // js 压缩插件 （用于压缩 JS）
    uglify = require('gulp-uglify'),
    // 压缩angularJs 文件
    ngmin = require('gulp-ngmin'),
    ngAnnotate = require('gulp-ng-annotate'),
    // js 去除console插件
    stripDebug = require('gulp-strip-debug'),
    // 压缩css插件
    minifyCSS = require('gulp-minify-css'),
    // 获取 gulp-imagemin 模块
    imagemin = require('gulp-imagemin'),
    // 压缩html插件
    htmlmin = require('gulp-htmlmin'),
    // 复制文件（文件拷贝）
    copy = require('copy'),
    //less和sass的编译
    sass = require("gulp-sass"),
    // 清除文件
    del = require('del'),
    //启动服务器
    browserSync = require('browser-sync').create(),
    //包管理工具
    bower = require('gulp-bower'),
    //打包压缩
    compressionZip = require('gulp-zip');

//gulp task执行顺序
var runSequence = require('run-sequence').use(gulp);
var fs = require('fs');

//设置各种输入输出文件夹的位置;
var path = {
    source: {
        def: 'src/',
        filterJs: ['filter/*.js'],
        all: ['src/**', '!src/lib/**'],
        css: ['src/**/*.css', '!src/lib/**'],
        sass: ['src/**/*.scss', '!src/lib/**'],
        js: ['src/**/*.js', '!src/lib/**'],
        html: ['src/**/*.html', '!src/lib/**'],
        img: ['src/**/*.{png,jpg}', '!src/lib/**'],
        json: ['src/**/*.json', '!src/lib/**']
    },

    product: {
        lib: 'dist/lib/',
        js: 'dist/js/',
        adminJs: 'dist/admin/js/',
        getJs: ['dist/**/*.js', '!dist/lib/**'],
        getCss: ['dist/**/*.css', '!dist/lib/**'],
        def: 'dist/'
    }
};

var gulpFunction = {
    //拷贝 图标、字体、第三方已压缩文件、json文件；
    copy: function () {
        gulp.src('src/lib/**/*.*')
            .pipe(gulp.dest(path.product.lib));
        gulp.src(path.source.json)
            .pipe(gulp.dest(path.product.def));
    },
    //压缩 angular js 文件；
    angularJsmin: function () {
        return gulp.src(path.source.js)
        //注意，此处特意如此，避免顺序导致的问题
            .pipe(ngAnnotate())
            .pipe(ngmin({dynamic: false}))
            .pipe(stripDebug())   //除去js代码中的console和debugger输出
            .pipe(uglify({outSourceMap: false}))    // 压缩文件 angular
            .pipe(gulp.dest(path.product.def));
    },
    //压缩 css 文件；
    cssmin: function () {
        // 1. 找到文件
        return gulp.src(path.source.css)
        // 2. 压缩文件
            .pipe(minifyCSS())
            // 3. 另存为压缩文件
            .pipe(gulp.dest(path.product.def))
    },
    //压缩图片；
    imagemin: function () {
        // 1. 找到图片
        return gulp.src(path.source.img)
        // 2. 压缩图片
            .pipe(imagemin({
                progressive: true
            }))
            // 3. 另存图片
            .pipe(gulp.dest(path.product.def))
    },
    //在html中压缩html
    htmlmin: function () {
        var htmlOptions = {
            collapseWhitespace: true,//压缩HTML
            //省略布尔属性的值 <input checked="true"/> ==> <input />
            collapseBooleanAttributes: false,
            //删除所有空格作属性值 <input id="" /> ==> <input />
            removeEmptyAttributes: true,
            //删除<script>的type="text/javascript"
            removeScriptTypeAttributes: true,
            //删除<style>和<link>的type="text/css"
            removeStyleLinkTypeAttributes: true,
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };
        return gulp.src(path.source.html)
        // .pipe(filter(['**', '!src/index.html']))     //过滤掉index.html
            .pipe(htmlmin(htmlOptions))
            .pipe(gulp.dest(path.product.def));
    },
    server: function () {
        browserSync.init({
            server: 'src/'
        });
    },
    auto: function () {
        gulp.watch(path.source.sass, ['sassCompile']);
        gulp.watch(['src/**', '!src/**.sass']).on('change', browserSync.reload);
    },
    sassCompile: function () {
        return gulp.src(path.source.sass)
            .pipe(sass())
            .pipe(gulp.dest('src/'));
    },
    zip: function () {
        return gulp.src(path.product.def + "**/*.*")
            .pipe(compressionZip('app.zip'))
            .pipe(gulp.dest('dist/'));
    }
};


gulp.task('clean', function () {
    return del(['./dist/**']);
});
gulp.task('package-bower', function () {
    createBower();
    runSequence('bower', 'cleanBower', 'copyBower');
});
gulp.task('package', function () {
    createBulidTask();
    fs.exists("./src/lib", function (exists) {
        if (!exists) {
            createBower();
            runSequence('bower', 'cleanBower', 'copyBower', ['copy', 'angularJsmin', 'cssmin', 'imagemin', 'htmlmin']);
        } else {
            runSequence(['copy', 'angularJsmin', 'cssmin', 'imagemin', 'htmlmin']);
        }
    });
});

gulp.task('server', function () {
    createServe();
    runSequence('sassCompile', 'serverRun', 'auto');
});

function createBower() {
    gulp.task('bower', function () {
        return bower({cmd: 'update', interactive: true});
    });
//清除lib文件夹下的文件
    gulp.task('cleanBower', function () {
        return del('src/lib/**');
    });
// 将bower的库文件对应到指定位置
    gulp.task('copyBower', function () {
        gulp.src('./bower_components/angular/angular.min.js')
            .pipe(gulp.dest('./src/lib/angular/'));
        gulp.src('./bower_components/angular-cookies/angular-cookies.min.js')
            .pipe(gulp.dest('./src/lib/angular/'));
        gulp.src('./bower_components/angular-sanitize/angular-sanitize.min.js')
            .pipe(gulp.dest('./src/lib/angular/'));
        gulp.src('./bower_components/angular-ui-router/release/angular-ui-router.min.js')
            .pipe(gulp.dest('./src/lib/angular/'));
        gulp.src('./bower_components/bootstrap/dist/**')
            .pipe(gulp.dest('./src/lib/bootstrap/'));
        gulp.src('./bower_components/bootstrap-table/dist/**')
            .pipe(gulp.dest('./src/lib/bootstrap-table/'));
        gulp.src('./bower_components/bootstrap-editable/src/**')
            .pipe(gulp.dest('./src/lib/bootstrap-editable/'));
        gulp.src(['./bower_components/bootstrap-sweetalert/dist/sweetalert.css', './bower_components/bootstrap-sweetalert/dist/sweetalert.min.js'])
            .pipe(gulp.dest('./src/lib/bootstrap-sweetalert/'));
        gulp.src('./bower_components/jquery/dist/jquery.min.js')
            .pipe(gulp.dest('./src/lib/jquery/'));
        gulp.src('./bower_components/jquery-backstretch/jquery.backstretch.min.js')
            .pipe(gulp.dest('./src/lib/jquery-backstretch/'));
        gulp.src('./bower_components/jquery-validation/dist/*.min.*')
            .pipe(gulp.dest('./src/lib/jquery-validation/'));
        gulp.src('./bower_components/jquery-validation/src/localization/messages_zh.js')
            .pipe(gulp.dest('./src/lib/jquery-validation/localization/'));
        gulp.src('./bower_components/font-awesome/css/font-awesome.min.css')
            .pipe(gulp.dest('./src/lib/font-awesome/css/'));
        gulp.src('./bower_components/font-awesome/fonts/**')
            .pipe(gulp.dest('./src/lib/font-awesome/fonts/'));
        gulp.src('./bower_components/x-editable/dist/bootstrap3-editable/**')
            .pipe(gulp.dest('./src/lib/bootstrap-editable/'));
    });
}
function createBulidTask() {
    gulp.task('copy', function () {
        return gulpFunction.copy();
    });
    gulp.task('angularJsmin', function () {
        return gulpFunction.angularJsmin();
    });
    gulp.task('cssmin', function () {
        return gulpFunction.cssmin();
    });
    gulp.task('htmlmin', function () {
        return gulpFunction.htmlmin();
    });
    gulp.task('imagemin', function () {
        return gulpFunction.imagemin();
    });
}
function createServe() {
    gulp.task('serverRun', function () {
        return gulpFunction.server();
    });
    gulp.task('auto', function () {
        return gulpFunction.auto();
    });
    gulp.task('sassCompile', function () {
        return gulpFunction.sassCompile();
    })
}


/**
 * clean            ---清理dist目录下所有文件
 *
 * package-bower    ---下载bower管理的lib
 *
 * package           ---打包
 *
 * server          ---编译
 */



