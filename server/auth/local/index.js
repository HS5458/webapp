/**
 * Created by wubo on 2017/6/1.
 */

'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    auth = require('../auth.service');
;

//http://passportjs.org/docs/username-password
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: '用户名不正确'});
            }
            if (!user.validPassword(password)) {
                return done(null, false, {message: '密码不正确.'});
            }
            return done(null, user);
        });
    }
));

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(401).send();
        }
        if (!user) {
            return res.status(403).send(info);
        }
        var token = auth.generateToken(user._id);
        return res.json({token: token});
    })(req, res, next);
});