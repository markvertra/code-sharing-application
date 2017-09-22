<div></div>

body, div {
  background-image: -webkit-repeating-radial-gradient(center center, black, black 0.4rem, transparent 0.4rem, transparent 100%);
  background-image: repeating-radial-gradient(center center, black, black 0.4rem, transparent 0.4rem, transparent 100%);
  background-size: 1.5rem 1.5rem;
  background-position: center;
}

div {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -200vmax;
  margin-left: -200vmax;
  height: 400vmax;
  width: 400vmax;
  background-size: 1.6rem 1.6rem;
  -webkit-animation: woop 30s infinite linear;
          animation: woop 30s infinite linear;
}

@-webkit-keyframes woop {
  to {
    -webkit-transform: rotate(1turn);
            transform: rotate(1turn);
  }
}

@keyframes woop {
  to {
    -webkit-transform: rotate(1turn);
            transform: rotate(1turn);
  }
}


///////////////
///////////////
///////////////

html, body {
  display: flex;
  align-items: center;
  justify-content: center;
	width: 100vw;
	height: 100vh;
	margin: 0;
}




var lines = [];

function Line() {
	this.xoffStart = random(0, 10000);
	this.xoff1 = this.xoffStart;
	this.xoff2 = this.xoffStart;
	this.inc1 = random(0.001, 0.009);
	this.inc2 = 0.001;

	this.reset = function() {
		this.xoff1 = this.xoffStart;
		this.xoff2 += this.inc2;
	};
}

function init() {
	noiseSeed(random(0, 10000));

	lines = [];

	for (var i = 0; i < random(20, 30); i++) {
		lines.push(new Line());
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	init();

	noFill();
	stroke(255);
	strokeWeight(4);
}

function mousePressed() {
	init();
}

function draw() {
	background(25);

	lines.forEach(function(line, lineIndex) {
		beginShape();
		for (var x = width / 15; x < width - width / 15; x += 3) {
			var y =
				noise(line.xoff1 + line.xoff2, line.xoff1) * 200 +
				height / 2 - 100 + sin(line.xoff1);
			curveVertex(x, y);

			line.xoff1 += line.inc1;
		}
		endShape();

		line.reset();
	});
}
