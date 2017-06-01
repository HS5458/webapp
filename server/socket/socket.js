/**
 * Created by wubo on 2017/5/30.
 */
'use strict';

var
    countUp,setWatch,
    http = require('http'),
    path = require('path'),
    express = require('express'),
    socketIo = require('socket.io'),
    fs = require('fs'),
    serveStatic = require('serve-static'),
    app = express(),
    server = http.createServer(app),
    io = socketIo.listen(server),
    watchMap = {},
    countIdx = 0;

setWatch = function (url_path, file_type) {
    console.log("setWatch called on " + url_path);

    if(!watchMap[url_path]){
        console.log("setting watch on " + url_path);
        fs.watchFile(
            url_path.slice(1),
            function (current, previous) {
                console.log("file accessed");
                if(current.mtime !== previous.mtime){
                    console.log("file changed");
                    io.sockets.emit(file_type,url_path);
                }
            }
        );
        watchMap[url_path] = true;
    }
}
countUp = function () {
    countIdx++;
    console.log(countIdx);
    io.sockets.send(countIdx);
};

app.use(serveStatic(path.join(__dirname, "/")));

app.get("/", function (req, res) {
    res.redirect("/socket.html");
});

server.listen(3000);
console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);

setInterval(countUp,1000);