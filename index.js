var app = require('express')();
var bodyParser = require('body-parser')
 
app.use(bodyParser.json());


var apiRouter = express.Router();
app.use('/api-name/v1', apiRouter);
 
var ResourceController = require('./controllers/ResourceController');
var rc = new ResourceController(apiRouter);


var server = app.listen(3000, function () {
  var host = server.address().address;
  host = (host === '::' ? 'localhost' : host);
  var port = server.address().port;
 
  console.log('listening at http://%s:%s', host, port);
});