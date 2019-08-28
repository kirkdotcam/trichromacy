let colorWheel = ['red', 'green', 'blue'];
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

colorGen([5,5,5]);

/**
 * Handles generating new set of three colors; makes 
 * payload request to /submissions on server
 * @param {Number[]} biasArr 
 */
function colorGen(biasArr) {

  let newGoal = weightedRandom(colorWheel, biasArr);

  goalLabel.html(`Which color has the most ${newGoal}?`)
    .style('color', d3.color(newGoal));


  colorContainer.select('g')
    .selectAll("rect")
    .data(boxData)
    .attr("x", function (d) { return d.x; })
    .attr("y", "60")
    .attr("fill", () => d3.rgb(...getRandomColors()).toString())
    .on('click', function(){

      
      let payload = {
        choices:[],
        selected:d3.select(this).data()[0].id,
        goal: newGoal,
        bias: biasArr,
        id: userId
      };

      
      d3.selectAll(".colorSquare").attr(null,function(){

        let {r, g, b} = d3.rgb(d3.select(this).attr("fill"));
        payload.choices.push([r,g,b]);
      
      });

      d3.json('/submissions', {
        method: "POST",
        body: JSON.stringify(payload),
        headers:{
          "Content-Type": "application/json"
        }
      }).then((response)=>{
        console.log(response);
        
        colorGen(response);
      });
    });
}

/** builds array of three random colors */
function getRandomColors(){
  return ([
    rand256(),
    rand256(),
    rand256()
  ]);
}

/**
 * makes a weighted random selection
 * @param {any[]} list array of values
 * @param {Number[]} weights array of weights to apply to each value
 */
function weightedRandom(list, weights) {
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
  //TODO: new biasing method: add a static number to the roll every time on a miss, subtract on a hit. 
  return Math.floor(Math.random() * 255);
}

