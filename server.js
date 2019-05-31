let tf = require('@tensorflow/tfjs');
let express = require('express');
let path = require('path');
let biasing = require('./utils');
let mongojs = require('mongojs')
require('dotenv').config();
let PORT = process.env.PORT;

let db = process.env.NODE_ENV ?
mongojs(process.env.MONGODB_URI, ['submissions'])
: mongojs('colors',['submissions']);

db.on('connect',()=> console.log("database connected"));
db.on('error', (err) => console.error(err));

let submissionCollection = db.collection('submissions');

let app = express();
let utils = requre('utils');


app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/',function(req,res){
	res.sendFile('./index.html');
});

let goalDict = {
	red: 0,
	green: 1,
	blue: 2
};

app.post('/submissions',function(req,res){

	let data = (req.body);
	let goalNum = goalDict[data.goal];

	//extract goal column
	let arr = [];
	for(let i = 0; i < 3; i++){
		arr.push(parseInt(data.choices[i][goalNum]));
	}

	data.answer = arr.indexOf(Math.max(...arr));

	data.correct = Boolean(data.answer == data.selected);

	let newBias = biasing(data.bias, data.correct, goalNum);

	submissionCollection.insert(data)
	res.json(newBias);
});




app.listen(PORT,function(){
	console.log(`Listening on port ${PORT}`);
});
