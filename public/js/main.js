var colorWheel = ['red', 'green', 'blue'];
var biasArray = [5,5,5];


$(document).ready(function () {
  var $colors = $('#colorDiv');
  //delegate colorAjax() to colorDiv
	colorGen(biasArray);


  $colors.on('click','.colorBox',function(){
    var colorData = {}

    colorData.selected = parseInt($(this).attr('id'));

    colorData.choices = []
    $colors.children('div').each(function(i,el){
      var toDecompose = $(this).css('background-color');
      var decomposed = [];
      toDecompose.substring(4,(toDecompose.length-2)).split(',').forEach(function(el){
        decomposed.push(parseInt(el.trim()))
      });

      colorData.choices.push(decomposed);
    });

    colorData.goal = $('#goalColor').data('newColor');

		colorData.bias = biasArray;
		console.log(colorData)

    $.post('/colors',colorData)
    .done(function(data){
      console.log(`data submitted `,data);
			biasArray=data;
			colorGen(biasArray)
    })
  })

  //when finished with biasing on server side, modify this to accept a biasing array.
  function colorGen(biasArr) {
    $colors.empty()
    var text = $('<h3>');
    // var newColor = colorWheel[Math.floor(Math.random() * 3)]
		var newColor = getRandomItem(colorWheel,biasArr)
		console.log('gri', biasArr)
    text.text(`Which color has the most ${newColor}?`);
    text.attr('id','goalColor');
    text.data('newColor',newColor);

    $colors.append(text);

    for (var i = 0; i < 3; i++) {
      var genDiv = $('<div>')
      genDiv.css("background-color", function () {
				//call biased version of rand256 here, slot values into following return statement
        return `rgb(${rand256()},${rand256()},${rand256()})`
      });
      genDiv.attr('id', i);
      genDiv.attr('class', 'colorBox');
      $colors.append(genDiv);
    }

  }
})

var rand = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

var getRandomItem = function (list, weights) {
	var totalWeight = weights.reduce(function(acc,curr){
    return acc+curr;
  })

  var random = rand(0, totalWeight);
  var weightSum = 0

	for (i = 0; i <= weights.length; i++) {
    weightSum += weights[i];
		if (random <= weightSum) {
			return list[i];
		}
	}
};


function rand256() {
  return Math.floor(Math.random() * 255);
}
