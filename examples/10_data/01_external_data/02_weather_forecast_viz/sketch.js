// ITP Networked Media, Fall 2014
// Daniel Shiffman
// Graph 14 day forecast from:
// http://openweathermap.org/API
// https://github.com/shiffman/itp-networked-media

function setup() {
  var canvas = createCanvas(600, 200);
  canvas.position(0,0);
  
  // A link to trigger NYC data
  var nyc = createA("#","New York");
  nyc.mousePressed(newyork);
  nyc.position(10,220);

  // A link to trigger London data
  var lond = createA("#","London");
  lond.mousePressed(london);
  lond.position(100,220);
  
  // No animation
  noLoop();

}

// Load the NY data (see: sketch_bind for strategy to condense these into one function)
function newyork() {
  loadJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=New%20York&mode=json&units=imperial&cnt=14", drawData);
}

function london() {
  loadJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=imperial&cnt=14", drawData);
}

function clearDom() {
  // Grab all the elements that are of class temp
  var elements = getElements("temp");
  // Remove all the elements
  for (var i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
}

function drawData(data) {
  clearDom();
  
  clear();  
  // DOM element for city
  var city = createDiv(data.city.name + ' 14 day forecast');
  city.style("color: #FFFFFF; font-size: 16pt");
  city.position(10,20);
  city.class("temp");

  // Draw a line graph
  var w = width/data.list.length;
  stroke(0);
  strokeWeight(2);
  beginShape();
	for (var i=0; i<data.list.length; i++) {
    // This is how we get the data from JSON
    var temp = data.list[i].temp.day;
    // Arbitrary mapping of data
    var y = map(temp,0,100,height,0);
    var x = w/2+i*w;
    vertex(x,y);
    // A DOM element to display actual temperature
    var day = createDiv(floor(temp));
    day.style("color: #000000");
    day.position(x,y);
    day.class("temp");

	}
  endShape();
}
