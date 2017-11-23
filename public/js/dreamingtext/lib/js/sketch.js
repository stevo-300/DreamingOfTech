// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var font;
var vehicles = [];
var currentTarget = 1;

function preload() {
  font = loadFont('/fonts/AvenirNextLTPro-Demi.otf');
}

function setup() {
  var canv = createCanvas(windowWidth, 300);
  canv.parent('banner');

  var points = font.textToPoints('Dreaming of Tech', 100, 200, 192);//, {
    //sampleFactor: 0.25
  //});

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    stroke(255);
    strokeWeight(8);
    point(pt.x, pt.y);
  }



  var startt = width/2-width/9;
  var ranget = width/2+width/9;
  console.log(ranget);
  var newPoints = [];
  var thirds = [startt+((ranget-startt)/4.5),ranget-((ranget-startt)/4.5)];

  for (var i = startt; i <= ranget;i+=10) {
    newPoints.push(createVector(i,height/4*3));
    if (i >= thirds[0] && i <= thirds[1]) {
      newPoints.push(createVector(i, sq((-0.1*map(i,thirds[0],thirds[1],-65,65)))+(height/6) ));
    }

    if (i <= thirds[0]) {
      newPoints.push(createVector(i, sq((-0.1*map(i,startt,thirds[0],-35,35)))+(height/3.7) ));
    }

    if (i >= thirds[1]) {
      newPoints.push(createVector(i, sq((-0.1*map(i,thirds[1],ranget,-35,35)))+(height/3.7) ));
    }

    if (i == startt) {
      for (var y = height/4*3; y > (sq(-0.1*65)+height/6); y--) {
        newPoints.push(createVector(sq(-0.1*map(y,height/4*3,(sq(-0.1*65)+height/6),-60,60))+i-(i/20),y));
      }

    }

    if (i > ranget-9.9) {
      for (var y = height/4*3; y > (sq(0.1*65)+height/6); y--) {
        var b = map(y,height/4*3,(sq(0.1*65)+height/6),60,-60);
        newPoints.push(createVector((sq(0.1*b)*-1)+i+(i/25),y));
      }

    }

  }

  var newtI = 0;
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].target.push(newPoints[newtI]);
    newtI++;
    if (newtI == newPoints.length) {
      newtI = 0;
    }
  }

}

function draw() {
  background(245);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors(currentTarget);
    v.update();
    v.show();
  }

  if (frameCount > 0 && frameCount % 600 == 0) {
    if (currentTarget == 0) {
      currentTarget = 1;
    } else {
      currentTarget = 0;
    }
  }

  // push();
  // stroke(255);
  // beginShape();
  // vertex(170,80);
  // bezierVertex(130, 100, 130, 150, 230, 150);
  // bezierVertex(250, 180, 320, 180, 340, 150);
  // bezierVertex(420, 150, 420, 120, 390, 100);
  // bezierVertex(430, 40, 370, 30, 340, 50);
  // bezierVertex(320, 5, 250, 20, 250, 50);
  // bezierVertex(200, 5, 150, 20, 170, 80);
  // endShape();
  // pop();





}
