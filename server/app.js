/**
 * Created by wubo on 2017/5/30.
 */
'use strict';
var http = require('http'),
    express = require('express'),
    app = express(),
    server = http.createServer(app),
    mongoose = require('mongoose');

// connect to mongodb
mongoose.connect("mongodb://localhost/spa", function (err) {
    if (err) console.log("Mongodb connect fail");
    console.log("Mongodb connect Successful");
});
// load express settings
require('./config/express')(app);
// load routes
require('./routes')(app);

server.listen(3000);
console.log('Listening on port %d', server.address().port);
