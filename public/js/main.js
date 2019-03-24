let colorWheel = ['red', 'green', 'blue'];
let biasArray = [5, 5, 5];
let userId = Math.random().toString(36).substring(2, 15);
let colorContainer = d3.select('#colorContainer');
let goalLabel = d3.select('#goalLabel');


let boxData = [{
  id:1,
  x: 100
}, {
  id:2,
  x: 230
}, {
  id:3,
  x: 360
}];
// $(document).ready(function () {
// 	colorGen(biasArray);


//   colors.on('click',()=>{
//     var colorData = {};

//     colorData.selected = parseInt($(this).attr('id'));

//     colorData.choices = []
//     $colors.children('div').each(function(i,el){
//       var toDecompose = $(this).css('background-color');
//       var decomposed = [];
//       toDecompose.substring(4,(toDecompose.length-2)).split(',').forEach(function(el){
//         decomposed.push(parseInt(el.trim()))
//       });

//       colorData.choices.push(decomposed);
//     });

//     colorData.goal = $('#goalColor').data('newColor');

// 		colorData.bias = biasArray;
// 		console.log(colorData)
//     colorData.userId = userId;
//     $.post('/colors',colorData)
//     .done(function(data){
//       console.log(`data submitted `,data);
// 			biasArray=data;
// 			colorGen(biasArray);
//     })
//   })

//   //when finished with biasing on server side, modify this to accept a biasing array.


//   }
// })


colorGen(biasArray)


function colorGen(biasArr) {

  let newGoal = getRandomItem(colorWheel, biasArr);

  goalLabel.html(`Which color has the most ${newGoal}?`)
    .style('color', d3.color(newGoal));

 
  // loop over boxes, applying new random colors


  colorContainer.select('g')
    .selectAll("rect")
    .data(boxData)
    .attr("x", function (d) { return d.x; })
    .attr("y", "100")
    .attr("fill", ()=> d3.rgb(...getRandomColor()).toString())
    .on('click', function(){
      console.log(d3.rgb(d3.select(this).style("fill")))
      console.log(d3.selectAll(".colorSquare"))
      colorGen(biasArr)
    });
}

function getRandomColor(){
  return ([
    rand256(),
    rand256(),
    rand256()
  ]);
}

function getRandomItem(list, weights) {
  let totalWeight = weights.reduce(function (acc, curr) {
    return acc + curr;
  });
  
  let random = d3.randomUniform(0, totalWeight)();
  let weightSum = 0;
  
  for (i = 0; i <= weights.length; i++) {
    weightSum += weights[i];
    if (random <= weightSum) {
      return list[i];
    }
  }
}

function rand256() {
  //new biasing method: at a static number to the roll every time on a miss, subtract on a hit. 
  return Math.floor(Math.random() * 255);
}