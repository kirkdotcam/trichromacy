let bc = require('badcube');
let tf = require('@tensorflow/tfjs');
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.sendFile('./index.html');
});

app.post('/colors',function(req,res){
	Submissions.insert(req.body)
	console.log(req.body)
	res.end()
})

app.listen(3000,function(){
	console.log('listening on port 3000');
});
