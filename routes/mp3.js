var express = require('express');
var router = express.Router();
var http = require('http'),
fileSystem = require('fs'),
path = require('path'),
util = require('util');

router.post('/', function(req, res, next) {
    console.log('recieved request')
    let server = http.createServer(function(request, response) {
        var filePath = 'txtSpeechOutput.mp3';
        var stat = fileSystem.statSync(filePath);

        response.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size
        });

        var readStream = fileSystem.createReadStream(filePath);
        // We replaced all the event handlers with a simple call to util.pump()
        // util.pump(readStream, response);
        readStream.pipe(response);
    })
    //server.listen(2000, function() {
    //});

    try{
        server.listen(2000).on('error', console.log)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
    
    //server.close();
    
})


module.exports = router;