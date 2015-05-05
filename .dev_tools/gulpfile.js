/* global require */

// Core modules
var path = require('path'), WS;

// Gulp modules
var gulp = require('gulp'),
    watch = require('gulp-watch'), // jshint ignore:line
    gulpif = require('gulp-if'),
    sprite = require('css-sprite').stream,
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    WebSocketServer = require('ws');

// Variables
var STATIC_DIR = path.join(__dirname, '..', 'static'), // jshint ignore:line
    BEM_DIR = STATIC_DIR + '/bem-blocks',
    BEM_RELDIR = BEM_DIR.replace(/\.\.?\//, '/');


/**
 * Собираем спрайты
 */
gulp.task('sprites', function () {
    'use strict';
    return gulp.src(BEM_DIR + '/icons/img/*.png')
        .pipe(sprite({
            name: 'sprite',
            style: '_sprite.less',
            cssPath: BEM_DIR + '/icons/',
            processor: 'less'
        }))
        .pipe(gulpif('*.png', gulp.dest(BEM_DIR + '/icons/'), gulp.dest(BEM_DIR + '/icons/')));
});


/** 
 * Работаем с стилями
 */
gulp.task('style-less', function () {
    'use strict';
    return gulp.src(BEM_DIR + '/bem.less')
        .pipe(less())
        .pipe(gulp.dest(BEM_DIR))
        .on('end', function () {
            WS.send({type: 'css', source: BEM_RELDIR + '/bem.css'});
        });
});

gulp.task('style-watch', function () {
    'use strict';
    gulp.watch(BEM_DIR + '/**/*.less', ['style-less']);
    WS.init();
});

gulp.task('style-min', function () {
    'use strict';
    return gulp.src(BEM_DIR + '/bem.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(BEM_DIR));
});

/**
 * Работаем с JS
 * TODO: Сборка и минификация bem скриптов
 *       Сборка и минификация не-bem скриптов
 *       Сборка и минификация подключаемых библиотек
 *       (в идеале с разбивкой по размеру)
 */

/** 
 * Собираем проект
 */
gulp.task('build-style', function () {
    'use strict';
    runSequence('style-less', 'style-min');
});

gulp.task('build', function () {
    'use strict';
    runSequence('build-style');
});


/**
 * WS сервер для WebpageLiveUpdate chrome-плагина
 * INFO: http://git.webpp.ru/tools/project-stub/wikis/WebpageLiveUpdate
 */
WS = {
    server: null,
    pool: {},
    init: function () {
        'use strict';
        var self = this;

        this.server = new WebSocketServer.Server({
            host: '0.0.0.0',
            port: 35729
        });

        this.server.on('connection', function (ws) {
            var id = Math.random();
            self.pool[id] = ws;
            ws.on('close', function () {
                delete self.pool[id];
            });
        });

        // Хак, для поддержки соединения.
        // TODO: сделать нормальное решение.
        setInterval(function () {
            self.send({type: 'ping'});
        }, 5000);
    },
    send: function (data) {
        'use strict';
        var message = JSON.stringify(data), id;
        for (id in this.pool) {
            if (this.pool.hasOwnProperty(id)) {
                this.pool[id].send(message);
            }
        }
    }
};
