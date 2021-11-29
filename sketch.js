/* eslint-disable no-undef, no-unused-vars */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Mirror {
  constructor(point1, point2) {
    this.a = createVector(point1.x, point1.y);
    this.b = createVector(point2.x, point2.y);
  }

  show() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class Ray {
  constructor(point1, point2, src_mirror) {
    this.src_mirror = src_mirror
    this.a = createVector(point1.x, point1.y);
    if(typeof(point2) === "number") this.b = p5.Vector.fromAngle(radians(point2));
    else this.b = createVector(point2.x, point2.y);
    this.findNearestPoint();
    //if (this.touch === null) {
      //this.b.setMag(1500);
      //this.touch = new Point(this.b.x, this.b.y);
    //}
    
  }
  shoot(wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.a.x;
    const y3 = this.a.y;
    const x4 = this.a.x + this.b.x;
    const y4 = this.a.y + this.b.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }
  }
  //show() {
    //stroke("yellow")
    //console.log(this.touch.x, this.touch.y)
    //line(this.a.x, this.a.y, this.touch.x, this.touch.y);
    
 // }
  
  show() {
    stroke("yellow");
   // push();
    //translate(this.a.x, this.a.y);
    //line(0, 0, this.b.x, this.b.y);
    //pop();
    line(this.a.x, this.a.y, this.a.x+this.b.x, this.a.y+this.b.y);
   
  }
  
  findNearestPoint() {
    this.nearest_inter = null;
    this.nearest_mirror = mirrors[0];
    let smallestDist = Infinity;
    for (let mirror of mirrors) {
      if (mirror != this.src_mirror){
        const point = this.shoot(mirror);
        if (point) {
          //console.log(mirrors[1] == mirror, mirrors.length)
          const d = p5.Vector.dist(this.a, point);
          if (d < smallestDist) {
            smallestDist = d;
            this.nearest_inter = point;
            this.nearest_mirror = mirror;
          }
        }
      }
      
    }
    if (this.nearest_inter === null){
      this.b.setMag(1500);
      //console.log(rayList.length);
    }else{
      this.b.x = this.nearest_inter.x - this.a.x;
      this.b.y = this.nearest_inter.y - this.a.y;
    }
      //console.log(this.b.x, this.b.y);
      
    
  }
  
  getReflection(){
    //let dummy = createVector(this.nearest_inter.x, this.nearest_inter.y)
    
    let relatif_vector = this.nearest_mirror.b.copy();
    relatif_vector.sub(this.nearest_inter);
    
    //drawArrow(this.nearest_inter, relatif_vector, 'red');
    relatif_vector.rotate(radians(90));
    //drawArrow(this.nearest_inter, relatif_vector, 'purple');
    let dummy = this.b.copy()
    let reflect_vector = dummy.reflect(relatif_vector);
    //drawArrow(this.nearest_inter, reflect_vector, 'blue');
    
    
    return new Ray(this.nearest_inter, reflect_vector, this.nearest_mirror);
  }
  
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

//for i in range(n_reflect):
  //for ray in rays[:-n_rays]:
    //rays.append(ray.reflect())


var points = [];
var mirrors = [];
var rayList = [];
var staticRayList = [];

var staticFlag = false;
var interactiveFlag = false;
var showExample = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0); 
  // Put setup code here
  buttonClear = createButton("Clear all");
  buttonExample = createButton("Draw example");
  buttonCreateRay = createButton("Create Ray Source");
  buttonShootRays = createButton("Shoot X-rays");
  //buttonChooseRays = createButton("Shoot X-rays");
  buttonClear.position(25, 25);
  buttonExample.position(25, 50);
  buttonCreateRay.position(135,25);
  buttonShootRays.position(270,25);
  buttonClear.mouseClicked(resetpoints);
  buttonShootRays.mouseClicked(interactiveMode);
  buttonCreateRay.mouseClicked(staticMode);
  buttonExample.mouseClicked(exampleMode);
  
  sliderRays = createSlider(0, 50, 5, 1);
  sliderRays.position(275, 55);
  sliderRays.style('width', '80px');
  
  sliderReflects = createSlider(0, 50, 5, 1);
  sliderReflects.position(400, 55);
  sliderReflects.style('width', '80px');
  
}

function orientation(a, b, c) {
  let val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  //signs inverted for y coordinates in order to have (0,0) as lower left corner

  return val;
}

function resetpoints() {
  points = [];
  mirrors = [];
  staticRayList = [];
  showExample = false;
}

function staticMode(){
  staticFlag = true;
  interactiveFlag = false;
}

function interactiveMode() {
  interactiveFlag = true;
  staticFlag = false;
}

function exampleMode(){
  showExample = true;
}

function drawExample(){
  // Vertical lines
  mir1 = new Mirror(new Point(180, 200), new Point(180, 300));
  mir2 = new Mirror(new Point(520, 200), new Point(520, 300));
  // Open square lines
  mir3 = new Mirror(new Point(300, 200), new Point(400, 200));
  mir4 = new Mirror(new Point(300, 300), new Point(400, 300)); 
  // Horizontal lines left
  mir5 = new Mirror(new Point(205, 150), new Point(275, 150));
  mir6 = new Mirror(new Point(205, 350), new Point(275, 350)); 
  // Horizontal lines left
  mir7 = new Mirror(new Point(425, 150), new Point(495, 150));
  mir8 = new Mirror(new Point(425, 350), new Point(495, 350));
  mirrors.push(mir1);
  mirrors.push(mir2);
  mirrors.push(mir3);
  mirrors.push(mir4);
  mirrors.push(mir5);
  mirrors.push(mir6);
  mirrors.push(mir7);
  mirrors.push(mir8);
}

function draw() {
  // Put drawings here
  background(0);
  fill(255);
  textSize(24);
  text(sliderRays.value(), 310, 110);
  
  textSize(20);
  fill("white");
  text("reflections", 400, 40);
  text(sliderReflects.value(), 430, 110);
  //ellipse(300,200, 6);
  fill("black");
  
  rayList = [];
  let n_static = staticRayList.length;
  
  if (interactiveFlag && !staticFlag) {
    if(mouseY > 200)
      loadRays(sliderRays.value());
  }
  
  if(showExample){
    drawExample();
  }
  
  computeReflections(rayList);
  computeReflections(staticRayList);
  
 
  for (ray of rayList)
    ray.show();

  for (ray of staticRayList)
    ray.show();
  
  staticRayList = staticRayList.slice(0, n_static);
  
  //for (ray of staticRayList)
    //ray.nearest_inter = ray.findNearestPoint();
  
  for (let i = 0; i < mirrors.length; i++) {
    mirrors[i].show();
  }
}

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
        //console.log(tmp_ray.nearest_inter);
        rays.push(tmp_ray);
      }
        
    }
  }
}

function loadRays(raysNumber) {
  let degreeStep = 360/raysNumber;
  //if degreeStep != null
  for (let i=0; i<raysNumber*degreeStep; i+= degreeStep) {
    rayList.push(new Ray(new Point(mouseX, mouseY), i, null))
  }
}

function overlap(base1, base2) {
  
  const abc = orientation(base1.a, base1.b, base2.a);
  const abd = orientation(base1.a, base1.b, base2.b);
  const acd = orientation(base1.a, base2.a, base2.b);
  const bcd = orientation(base1.b, base2.a, base2.b);

  return acd !== bcd && abc !== abd
}

function mousePressed(clear = false) {
  if(mouseY > 125){
    points.push(new Point(mouseX, mouseY));
    
    if (points.length === 2 && ! staticFlag) {
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
      if (!overlapping) mirrors.push(new_mirror);
      else {points.pop(); points.pop();}
      
    }else if(points.length === 2){
      points[1].x -= points[0].x;
      points[1].y -= points[0].y;
      staticRayList.push(new Ray(...points, null));
      points = [];
    }
  }

  if (clear === true) resetpoints();
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}