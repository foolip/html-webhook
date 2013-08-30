var http = require('http');
http.createServer(function (req, res) {
  if (req.url == '/update-html-mirror') {
    var batch = require('child_process').spawn('batch');
    batch.on('close', function(code) {
      if (code == 0) {
        res.statusCode = 200;
        console.log('update queued by ' + req.socket.remoteAddress +
                    ' at ' + new Date().toISOString());
      } else {
        res.statusCode = 500;
      }
      res.end(http.STATUS_CODES[res.statusCode]);
    });
    batch.stdin.end(__dirname + '/update');
  } else {
    res.statusCode = 404;
    res.end(http.STATUS_CODES[res.statusCode]);
  }
}).listen(8731);
