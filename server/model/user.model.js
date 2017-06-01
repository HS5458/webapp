/**
 * Created by wubo on 2017/5/31.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nickname: String,
    username: {
        type: String,
        lowercase: true
    },
    qq: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    hashedPassword: String,
    role: {
        type: String,
        default: 'user'
    },
    avatar: String,
    status: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model("User", UserSchema);
var Promise = require('bluebird');
Promise.promisify(User);
Promise.promisify(User.prototype);

module.exports = User;