/**
 * Created by wubo on 2017/5/31.
 */
'use strict';
var
    env = process.env.NODE_ENV,
    path = require('path'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverrid = require('method-override'),
    errorhandler = require('errorhandler'),
    serverStatic = require('serve-static'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'), // 跨域解决方案
    session = require('express-session'),
    RedisStore = require('connect-redis')(session)
;

module.exports = function (app) {
    app.set('trust proxy', 1); // trust first proxy
    var options = {};
    if (env === 'development') {
        options = {
            origin: "*",
        }
    } else if (env === "production") {
        options = {
            origin: ["http://www.fenghaisheng.com"]
        }
    }
    app.use(cors(options)); //跨域
    app.use(session({
        secret: "webapp-secret",
        resave: false,
        saveUninitialized: false,
        store: new RedisStore({
            host: '127.0.0.1',
            port: 6379,
        }),
        cookie: {secure: true, maxAge: 60000}
    }));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverrid());
    app.use(morgan('combined'));
    app.use(errorhandler());
    app.use(compression()); // 压缩response
    app.use(cookieParser()); // 处理cookie，，获取方式：req.cookies
    app.use(serverStatic(path.join(__dirname, 'public')));
};
