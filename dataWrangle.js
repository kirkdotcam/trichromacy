const tf = require('@tensorflow/tfjs');
const bc = require('badcube');

const Submissions = bc.Submissions;

const fullData = Submissions.findAll({})
var colorWheel = ['red', 'green', 'blue'];

let choicesArray = [];
let correctArray = [];
fullData.forEach((el) => {
  choicesArray.push(el.choices);
  correctArray.push(el.correct)
});

const colorObj = {
  red: [],
  green: [],
  blue: []
};

choicesArray.forEach((el) => {
  const array = el;
  const tempcolors = {
    red: [],
    green: [],
    blue: []
  }

  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array.length; j++) {
      tempcolors[colorWheel[j]].push(array[i][j]);
    };
  };
  multipush(colorObj, tempcolors);
})



function multipush(substrateObj, newObject) {
  Object.keys(newObject).forEach((key) => {
    substrateObj[key].push(newObject[key]);
  });
};

module.exports = {
  answers: correctArray,
  colors: colorObj
}
