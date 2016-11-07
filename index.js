var
  fs = require('fs'),
  express = require('express'),
  serveStatic = require('serve-static'),
  app = express();
  
app.use(function(req,res,next){ console.log('[' + new Date() + '] serving: ' + req.url + ' '); next(); });

app.use(serveStatic('public'));

app.get('/data.json', function(req,res){
	res.setHeader('Content-Type', 'application/json');
	fs.createReadStream('data/trump-lies.json').pipe(res); 
});

app.get('/data.csv', function(req,res){
	res.setHeader('Content-Type', 'text/csv');
	fs.createReadStream('data/trump-lies.csv').pipe(res); 
});


app.listen(2016, function(){
	console.log('listening @ http://localhost:2016');
});
