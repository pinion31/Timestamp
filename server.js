var http = require('http');
var url = require('url');
var fs = require('fs');
var queryString = require('query-string');

http.createServer(function(req,res) {
  var q = url.parse(req.url, true);
  fs.readFile('./static/index.html', function (err,data) {
    if (err){
      return err;
    }

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];

    if (q.search) {
      var parsed = queryString.parse(q.search);
      res.writeHead(200, {'Content-type': 'text/html', 'charset': 'UTF-8', });

      if (Number.isInteger(+parsed.request)) {
        var newDate = new Date(+parsed.request * 1000);
        res.write("Natural Time: " + (months[newDate.getMonth()] + " " + newDate.getDate() + ", " + (newDate.getYear() + 1900).toString()) + "<br>");
        var unixTime = (newDate.getTime()/1000).toString();
        res.end("Unix Time: " + unixTime);
      }
      else {
        var dateRaw = parsed.request.split(" ");

        if (dateRaw.length === 3) {
          var month = dateRaw[0].slice(0,3); //takes first 3 letters of month
          var day = dateRaw[1].slice(0,2); //day of month
          var year = dateRaw[2]; //year

          var newDate = new Date(month + " " + day + " " + year);

          if (Number.isInteger(newDate.getDate())) {
            res.write("Natural Time: " + (months[newDate.getMonth()] + " " + newDate.getDate() + ", " + (newDate.getYear() + 1900).toString()) + "<br>");
            var unixTime = (newDate.getTime()/1000).toString();
            res.end("Unix Time: " + unixTime);
          }
          else {
            res.end("Invalid Date");
          }
        }
        else {
          res.end("Invalid Date");
        }
      }
    }
    else {
      res.writeHead(200, {'Content-type': 'text/html'});
      res.write(data);

      return res.end();
    }
  });

}).listen(3000);