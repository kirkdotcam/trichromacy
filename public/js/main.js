var colorWheel = ['red', 'blue', 'green'];

$(document).ready(function () {
  var $colors = $('#colorDiv');
  //delegate colorAjax() to colorDiv
  colorGen()

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
    console.log(colorData)


    $.post('/colors',{data:JSON.stringify(colorData)})
    .done(function(data){
      console.log(`data submitted `,data);
    })
    colorGen()
  })

  function colorGen() {
    $colors.empty()
    var text = $('<h3>');
    var newColor = colorWheel[Math.floor(Math.random() * 2) + 1]
    text.text(`Which color has the most ${newColor}?`);
    text.attr('id','goalColor');
    text.data('newColor',newColor);

    $colors.append(text);

    for (var i = 0; i < 3; i++) {
      var genDiv = $('<div>')
      genDiv.css("background-color", function () {
        return `rgb(${rand256()},${rand256()},${rand256()})`
      });
      genDiv.attr('id', i);
      genDiv.attr('class', 'colorBox');
      $colors.append(genDiv);
    }

  }
})

function rand256() {
  return Math.floor(Math.random() * 255) + 1;
}
