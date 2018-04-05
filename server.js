var bc = require('badcube');
var tf = require('@tensorflow/tfjs');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/',function(req,res){
	res.sendFile('./index.html');
});

app.listen(3000,function(){
	console.log('listening on port 3000');
});
