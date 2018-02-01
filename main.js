// make a d3 selection of the canvas element
var canvas = d3.select('canvas');
// get access to the Canvas Web API
var context = canvas.node().getContext('2d');

// assign width and height of canvas
var width = parseInt(canvas.attr('width'));
var height = parseInt(canvas.attr('height'));

// creates a rectangle with a magenta border
context.strokeStyle = 'magenta';
// shortcut of creating a rectanble without a fill
context.strokeRect(0, 0, width, height);

// specify margins in an object
// convenient to store margin varibles rather than having one variable per side
var margin = {
  top: 20,
  bottom: 40,
  left: 30,
  right: 20
};

// change width and height to account for margins
width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

// translate the coordinate system origin
context.translate(margin.left, margin.top);

// draw another rectangle
context.fillStyle = '#eef';
context.fillRect(0, 0, width, height);

// some sample data
var data = [21, 50, 10, 35, 92, 12, 67, 5, 180, 4, 13, 6, 95];

// function().anotherFunction() <-- alled method chain (used by d3 a lot)
// setup a y scale function with domain and range
var yScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .rangeRound([height, 0]);

// setup an x scale function with domain and range
var xScale = d3.scaleBand()
  .domain(data)
  .range([0, width])
  .padding(0.1);

// fill rectangles with teal color
context.fillStyle = 'teal';

// forEach interates over an array
data.forEach(function(d, i) {
  //var barPadding = 5;
  //var barWidth = 30;

  // draw the bars
  //context.fillRect(
  //  (i * barWidth) + barPadding, height - d, barWidth - barPadding, d);
  context.fillRect(
    // use the xScale to set the starting x, y coordinates
    xScale(d),
    yScale(d),
    // use the width of scaleBand to set the end x coordinate
    xScale.bandwidth(),
    // subtracting the yScale value from height gives us the end y coordinate
    height - yScale(d)
  );
});

// Draw x-axis (tick marks at bottom of bars)
// Draw new path
context.beginPath();

// iterate over x domain values
xScale.domain().forEach(function(d) {
  // move pen to starting x, y coordinate
  context.moveTo(xScale(d) + xScale.bandwidth() / 2, height);
  // plus 10 makes tick 10 pixels long
  context.lineTo(xScale(d) + xScale.bandwidth() / 2, height + 10);
});

// sets the stroke style
// context.strokeStyle = '#000';
// creates stroke
context.stroke();

// Add labels for the x-axis
// set label positions
context.textAlign = 'center';
context.textBaseline = 'top';

// set the text fill style
context.fillStyle = '#333';

// create x labels
xScale.domain().forEach(function(d, i) {
  context.fillText(i, xScale(d) + xScale.bandwidth() / 2, height + 10);
});

// create labels for each bar's value
// set label position to bottom
context.textBaseline = 'bottom';

// create values for each bar
xScale.domain().forEach(function(d, i) {
  context.fillText(d, xScale(d) + xScale.bandwidth() / 2, yScale(d));
});

// create labels for y-axis
// var yTickCount = 10;
var yTicks = yScale.ticks(4);

// iterate over y tick values
// create tick marks on y axis
yTicks.forEach(function(d) {
  context.moveTo(0, yScale(d) + 0.5);
  context.lineTo(-6, yScale(d) + 0.5);
});
context.strokeStyle = "blue";
context.stroke();

// create y labels
context.textAlign = 'right';
context.textBaseline = 'middle';

yTicks.forEach(function(d) {
  context.fillText(d, -9, yScale(d));
});

// create vertical line for the y-axis
context.beginPath();
context.moveTo(1, 1);
context.lineTo(1, height + 1);
context.stroke();

// saves current coordinate system
// allows us to come back to it at a later time
context.save();
// rotate coordinates by 90 degrees counter clockwise
context.rotate(- Math.PI / 2);
context.textAlign = 'right';
context.textBaseline = 'top';
context.fillText('Fake Values', -5, 5);
context.restore();