class Ray {
  constructor(point1, point2, src_mirror) {
    this.src_mirror = src_mirror
    this.a = createVector(point1.x, point1.y);
    if(typeof(point2) === "number") this.b = p5.Vector.fromAngle(radians(point2));
    else this.b = createVector(point2.x, point2.y);
    this.findNearestPoint();
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

  show() {
    stroke("yellow");
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
