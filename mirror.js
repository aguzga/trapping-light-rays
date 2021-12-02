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
