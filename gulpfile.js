var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserify = require('browserify'),
  concat = require('gulp-concat'),
  embedlr = require('gulp-embedlr'),
  refresh = require('gulp-livereload'),
  lrserver = require('tiny-lr')(),
  express = require('express'),
  livereload = require('connect-livereload'),
  notify = require('gulp-notify'),
  replace = require('gulp-replace'),
  source = require('vinyl-source-stream'),
  babel = require("babelify"),
  watchify = require('watchify'),
  gutil = require('gulp-util'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  exit = require('gulp-exit'),
  handlebars = require('gulp-compile-handlebars'),
  through = require('through2'),
  livereloadport = 35729,
  serverport = 5000;

//We only configure the server here and start it only when running the watch task
var server = express();
//Add livereload middleware before static-middleware
server.use(livereload({
  port: livereloadport
}));
server.use(express.static('./build'));

//Task for sass using libsass through gulp-sass
// gulp.task('sass', function(){
//   gulp.src('sass/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('build'))
//     .pipe(refresh(lrserver));
// });

var bundler = watchify(
    browserify({
        entries: ['./assets/scripts/app.js'],
        debug: true,
        extensions: ['.js']
    }).transform(babel.configure({
        // Use all of the ES2015 spec
        presets: ["es2015"]
    }))
);
function compile(watch) {
  function rebundle() {
    return bundler
        .bundle()
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/scripts'));
  }

  if (watch) {
      bundler.on('update', function () {
          console.log('-> bundling...');
          rebundle();
      });

      rebundle();
  } else {
      rebundle().pipe(exit());
  }
}

function watch() {
  return compile(true);
};

//Task for processing js with browserify
gulp.task('browserify', function(){
  // gulp.src(['assets/scripts/components/*.js', 'assets/scripts/*.js'])
  //  .pipe(browserify().transform("babelify", {presets: ["es2015"]}))
  //  .on("error", notify.onError(function (error) {
  //       return "Message to the notifier: " + error.message;
  //   }))
  //  .pipe(concat('bundle.js'))
  //  .pipe(gulp.dest('build'))
  //  .pipe(notify("JS Ready!" ))
  //  .pipe(refresh(lrserver));

  // return browserify({entries: './assets/scripts/app.js', extensions: ['.js'], debug: true})
  //     .transform("babelify", {presets: ["es2015"]})
  //     .on("error", notify.onError(function (error) {
  //       gutil.log.bind( gutil, 'Browserify Error' );
  //           return "Message to the notifier: " + error.message;
  //     }))
  //     .pipe(concat('bundle.js'))
  //     .pipe(gulp.dest('build'))
  //     .pipe(notify("JS Ready!" ))
  //     .pipe(refresh(lrserver));

  return compile();

});

//Task for moving html-files to the build-dir
//added as a convenience to make sure this gulpfile works without much modification
gulp.task('templates', function(){
  gulp.src('assets/scripts/templates/*.hbs')
    .pipe(replace(/(<\\\s*)(.*)(\s*\/>)/g, "{{{component $2 }}}"))
    .pipe(through.obj(function (file, enc, cb) {
      console.log(file.contents.toString(), enc);
      file.contents = new Buffer(handlebars.Handlebars.compile(file.contents.toString()), "binary");
      cb(null, file);
    }))
    .pipe(gulp.dest('build/templates'))
    .on("error", notify.onError(function (error) {
      return "Message to the notifier: " + error.message;
    }))
    .pipe(notify("HBS Ready!" ))
    .pipe(refresh(lrserver));
});

//Convenience task for running a one-off build
gulp.task('build', function() {
  gulp.run('templates', 'browserify'); //'sass'
});

gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  server.listen(serverport);

  //Set up your livereload server
  lrserver.listen(livereloadport);
});

gulp.task('watch', function() {

  //Add watching on sass-files
  // gulp.watch('sass/*.scss', function() {
  //   gulp.run('sass');
  // });

  //Add watching on js-files
  // gulp.watch(['assets/scripts/components/*.js', 'assets/scripts/*.js'], function() {
  //   gulp.run('browserify');
  // });

  //Add watching on html-files
  gulp.watch('assets/scripts/templates/*.hbs', function () {
    gulp.run('templates');
  });
});
gulp.task('watch-js', function() { return watch(); });
gulp.task('default', function () {
  gulp.run('build', 'serve', 'watch', 'watch-js');
});
