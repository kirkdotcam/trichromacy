let bc = require('badcube');
let tf = require('@tensorflow/tfjs');
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
let utils = requre('utils');


app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.sendFile('./index.html');
});

let goalDict = {
	red: 0,
	green: 1,
	blue: 2
};

//should take in current bias array and output new bias array

app.post('/colors',function(req,res){

	let data = (req.body);
	let goalNum = goalDict[data.goal];

	//iterate through data choices and find teh index of correct answer
	let arr = [];
	for(let i = 0; i < 3; i++){
		arr.push(parseInt(data.choices[i][goalNum]));
	};
	data.answer = arr.indexOf(Math.max(...arr));


	data.correct = Boolean(data.answer == data.selected);

	let newBias = biasing(data.bias, data.correct, goalNum)
	console.log(data)
	bc.Submissions.insert(data);
	res.json(newBias);
});




app.listen(3000,function(){
	console.log('listening on port 3000');
});
