/* eslint-disable no-undef, no-unused-vars */

//==============================================================================
// GLOBAL VARIABLES
//==============================================================================
var points = [];
var mirrors = [];
var rayList = [];
var staticRayList = [];
var staticFlag = false;
var interactiveFlag = false;
var showExample1 = false;
var showExample2 = false;

//==============================================================================
// SETUP FUNCTION
//==============================================================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonClear = createButton("Clear all");
  buttonExample = createButton("Example 1");
  buttonExample2 = createButton("Example 2");
  buttonCreateRay = createButton("Create Ray Source");
  buttonShootRays = createButton("Shoot X-rays");
  var x_butt = 25
  var y_butt = 50
  let backcol = color(60, 60, 60);
  buttonClear.position(x_butt, y_butt);
  buttonExample.position(x_butt + 80, y_butt);
  buttonExample2.position(x_butt + 175, y_butt);
  buttonCreateRay.position(x_butt + 270,y_butt);
  buttonShootRays.position(x_butt + 418, y_butt);

  buttonClear.mouseClicked(resetpoints);
  buttonShootRays.mouseClicked(interactiveMode);
  buttonCreateRay.mouseClicked(staticMode);
  buttonExample.mouseClicked(exampleMode1);
  buttonExample2.mouseClicked(exampleMode2);

  buttonClear.style('background-color', backcol);
  buttonClear.style('color', '#FFFFFF');
  buttonClear.style('height', '40px');
  buttonShootRays.style('background-color', backcol);
  buttonShootRays.style('color', '#FFFFFF');
  buttonShootRays.style('height', '40px')
  buttonCreateRay.style('background-color', backcol);
  buttonCreateRay.style('color', '#FFFFFF');
  buttonCreateRay.style('height', '40px')
  buttonExample.style('background-color', backcol);
  buttonExample.style('color', '#FFFFFF');
  buttonExample.style('height', '40px')
  buttonExample2.style('background-color', backcol);
  buttonExample2.style('color', '#FFFFFF');
  buttonExample2.style('height', '40px')

  sliderRays = createSlider(0, 50, 5, 1);
  sliderRays.position(x_butt + 530, y_butt);
  sliderRays.style('width', '80px');

  sliderReflects = createSlider(0, 50, 5, 1);
  sliderReflects.position(650, y_butt);
  sliderReflects.style('width', '80px');
}

//==============================================================================
// FUNCTIONS WHICH MODIFY GLOBAL VAR
//==============================================================================
function resetpoints() {
  points = [];
  mirrors = [];
  staticRayList = [];
  showExample1 = false;
  showExample2 = false;
  staticFlag = false;
  interactiveFlag = false;
}

function staticMode(){
  staticFlag = true;
  interactiveFlag = false;
}

function interactiveMode() {
  interactiveFlag = true;
  staticFlag = false;
}

function exampleMode1(){
  resetpoints();
  showExample1 = true;
  showExample2 = false;
}

function exampleMode2(){
  resetpoints();
  showExample2 = true;
  showExample1 = false;
}

//==============================================================================
// DRAWING FUNCTIONS
//==============================================================================
function drawExample1(){
  var w = window.innerWidth;
  var start = w/2 - 440
  // Vertical lines
  mir1 = new Mirror(new Point(start + 180, 200), new Point(start + 180, 300));
  mir2 = new Mirror(new Point(start + 520, 200), new Point(start + 520, 300));
  // Open square lines
  mir3 = new Mirror(new Point(start + 300, 200), new Point(start + 400, 200));
  mir4 = new Mirror(new Point(start + 300, 300), new Point(start + 400, 300));
  // Horizontal lines left
  mir5 = new Mirror(new Point(start + 205, 150), new Point(start + 275, 150));
  mir6 = new Mirror(new Point(start + 205, 350), new Point(start + 275, 350));
  // Horizontal lines left
  mir7 = new Mirror(new Point(start + 425, 150), new Point(start + 495, 150));
  mir8 = new Mirror(new Point(start + 425, 350), new Point(start + 495, 350));
  mirrors.push(mir1);
  mirrors.push(mir2);
  mirrors.push(mir3);
  mirrors.push(mir4);
  mirrors.push(mir5);
  mirrors.push(mir6);
  mirrors.push(mir7);
  mirrors.push(mir8);
  // Light source
  staticRayList.push(new Ray(new Point(start + 300, 290), new Point(190, 316), null));
}

function drawExample2(){
  // Light source
  var w = window.innerWidth;
  var start = w/2 - 400
  // Frist two parallel lines
  mir1 = new Mirror(new Point(start + 180, 250), new Point(start + 180 - 100, 350));
  mir2 = new Mirror(new Point(start + 180, 150), new Point(start + 180 - 100, 250));
  mirrors.push(mir1);
  mirrors.push(mir2);
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, 0), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, -20), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, -40), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, -60), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, -80), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, -100), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, -120), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, -140), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, 20), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, 40), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, 60), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, 80), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, 100), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, 120), null));
  staticRayList.push(new Ray(new Point(start, 349), new Point(start + 100, 140), null));
}

function draw() {
  let back = color(20, 20, 20);
  background(back);
  fill(255);
  stroke('white')
  var w = window.innerWidth;
  noStroke();
  let c = color(40, 40, 40);
  fill(c)
  rect(0, 0, w, 50);
  fill("white");
  textSize(14);
  text("RAYS :", 560, 38);
  text(sliderRays.value(), 620, 38);
  textSize(14);
  fill("white");
  text("REFL. :", 655, 38);
  text(sliderReflects.value(), 718, 38);
  fill("black");

  rayList = [];
  let n_static = staticRayList.length;
  if (interactiveFlag && !staticFlag) {
    if(mouseY > 50)
      loadRays(sliderRays.value());
  }
  if(showExample1){
    drawExample1();
  }
  if(showExample2){
    drawExample2();
  }
  computeReflections(rayList);
  computeReflections(staticRayList);
  for (ray of rayList)
    ray.show();
  for (ray of staticRayList)
    ray.show();
  staticRayList = staticRayList.slice(0, n_static);
  for (ray of staticRayList)
    ray.findNearestPoint();
  for (let i = 0; i < mirrors.length; i++) {
    mirrors[i].show();
  }
}

//==============================================================================
// COMPUTATIONAL GEOMETRY FUNCTIONS
//==============================================================================
function orientation(a, b, c) {
  let val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  return Math.sign(val);
}

function computeReflections(rays){
  let n_reflect = sliderReflects.value();
  const raysNumber = rays.length;
  for (let i=0; i<n_reflect; i++){
    let tmp = rays.slice(rays.length-raysNumber, rays.length)
    for (ray of tmp){
      if (ray.nearest_inter !== null){
        ellipse(ray.nearest_inter.x, ray.nearest_inter.y, 10);
        let tmp_ray = ray.getReflection();
        if (tmp_ray.nearest_inter !== null)
          ellipse(tmp_ray.nearest_inter.x, tmp_ray.nearest_inter.y, 10);
        rays.push(tmp_ray);
      }

    }
  }
}

function overlap(base1, base2) {
  const abc = orientation(base1.a, base1.b, base2.a);
  const abd = orientation(base1.a, base1.b, base2.b);
  const acd = orientation(base1.a, base2.a, base2.b);
  const bcd = orientation(base1.b, base2.a, base2.b);
  return acd !== bcd && abc !== abd
}

//==============================================================================
// UTILITY FUNCTIONS
//==============================================================================
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadRays(raysNumber) {
  let degreeStep = 360/raysNumber;
  for (let i=0; i<raysNumber*degreeStep; i+= degreeStep) {
    rayList.push(new Ray(new Point(mouseX, mouseY), i, null))
  }
}

//==============================================================================
// USER INTERACTION FUNCTIONS
//==============================================================================
function mousePressed(clear = false) {
  if(mouseY > 50){
    points.push(new Point(mouseX, mouseY));
    if (points.length === 2 && ! staticFlag) { // Draw mirros
      let overlapping = false;
      const mir_len = mirrors.length;
      let new_mirror = new Mirror(...points);
      points = [];
      for (let i = 0; i < mir_len; i++) {
        if (overlap(mirrors[i], new_mirror)) {
          overlapping = true;
          break;
        }
      }
      if (!overlapping){
        mirrors.push(new_mirror);
      }
      else {points.pop(); points.pop();}
    }
    else if(points.length === 2){ // Draw static ray
      points[1].x -= points[0].x;
      points[1].y -= points[0].y;
      staticRayList.push(new Ray(...points, null));
      points = [];
    }
  }
  if (clear === true) resetpoints();
}

windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
