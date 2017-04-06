var express = require('express')

var app = express()
var PORT = 3000;


// MIDDLE WARE GOES UP TOP - ORDER IS IMPORTANT
var middleware = require('./middleware')

// APP USE IS APPLICATION MIDDLEWARE (CALLED FOR EVERY ROUTE)
// app.use(middleware.requireAuthentication)
app.use(middleware.logger)

app.get('/about', function (req, res){
  res.send('About Us');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function (){
  console.log('Express server started on port ' + 3000)
});
