/**
 * Created by wubo on 2017/6/1.
 */
'use strict';

var mongoose = require('mongoose'),
    User = require('User'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    compose = require('composable-middleware');

/**
 * 生成token
 * id : mongodb数据库中数据行的id
 */
function generateToken(id) {
    // id,session 的 secrets的值, 有效持续时间
    return jwt.sign({_id: id}, "webapp-secret", {expiresIn: '1y'});
}

exports.generateToken = generateToken;
