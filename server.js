var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');
var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pusher = new Pusher({ appId: "476899", key: "cc95fa24b41068f04265", secret:  "9bdf9bd2678c1dce104e", cluster: "ap2" });


app.post('/message', function(req, res) {
  var message = req.body.message;
  pusher.trigger( 'public-chat', 'message-added', { message });
  res.sendStatus(200);
});

app.get('/',function(req,res){      
     res.sendFile('index.html', {root: path.join(__dirname,'../node') });
});

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`app listening on port ${port}!`)
});
