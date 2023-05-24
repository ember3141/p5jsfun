p5.disableFriendlyErrors = true;
const CX = 500,
	CY = 500,
	IX = 100,
	IY = 100;


const keys = {
	c: {
		s: [
			[10, 14, 70, 90],
			[10, 16.25, 80, 90]
		],
		color: [255, 255, 255],
		touching: false,
		pressed: false
	},
	cs: {
		s: [
			[14, 18, 70, 80]
		],
		color: [255, 0, 0],
		touching: false,
		pressed: false
	},
	d: {
		s: [
			[16.25, 23, 80, 90],
			[18, 21.75, 70, 90]
		],
		color: [255, 255, 255],
		touching: false,
		pressed: false
	},
	ds: {
		s: [
			[21, 25, 70, 80]
		],
		color: [255, 0, 0],
		touching: false,
		pressed: false
	},
	e: {
		s: [
			[23, 29.25, 80, 90],
			[25, 29.25, 70, 90]
		],
		color: [255, 255, 255],
		touching: false,
		pressed: false
	},
	f: {
		s: [
			[29.25, 33, 70, 90],
			[29.25, 35.5, 80, 90]
		],
		color: [255, 255, 255],
		touching: false,
		pressed: false
	},
	fs: {
		s: [
			[33, 37, 70, 80]
		],
		color: [255, 0, 0],
		touching: false,
		pressed: false
	},
	g: {
		s: [
			[35.5, 42.25, 80, 90],
			[37, 40.75, 70, 90]
		],
		color: [255, 255, 255],
		touching: false,
		pressed: false
	},
	gs: {
		s: [
			[40.75, 44.75, 70, 80]
		],
		color: [255, 0, 0],
		touching: false,
		pressed: false
	},
	a: {
		s: [
			[42, 49, 80, 90],
			[44, 47.75, 70, 90]
		],
		color: [255, 255, 255],
		touching: false,
		pressed: false
	},
	as: {
		s: [
			[47.75, 51.75, 70, 80]
		],
		color: [255, 0, 0],
		touching: false,
		pressed: false
	},
	b: {
		s: [
			[49, 55.25, 80, 90],
			[51.75, 55.25, 70, 90]
		],
		color: [255, 255, 255],
		touching: false,
		pressed: false
	}
};

var controls = {
	/* lpf: {
    0 	sx: 5,
	1 	sy: 12,
	2 	ex: 5,
	3 	ey: 22,
	4 	min: 0,
	5 	max: 100,
	6 	inc: 1,
	7 	val: 0.5,
	8 	color: [0,0,255]
	9     type: 1 is slide, 2 is button
	},
	button
	0, type 2
	1  x
	2  y
	5  val true/false
	6 color off
	7 color on
	*/
	
	lpf: [1,5, 12, 5, 22, 0, 100, 1, 0.5, [0, 0, 255]],
	hpf: [1,10, 12, 10, 22, 0, 100, 1, 0.5, [255, 0, 0]],
	lhf: [1,15, 12, 15, 22, 0, 100, 1, 0.5, [200, 0, 255]], 
	toggle: [2,60,60,false,[100,0,0],[255,0,0]]
};

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	createCanvas(CX, CY);
	img = createImage(IX, IY);
	background(0);
	img.loadPixels();
	for (var i = 0; i < img.pixels.length / 4; i++) {
		j = i * 4;
		img.pixels[j + 3] = 255;
	}
	img.updatePixels();
	noSmooth();
	noCursor();
	frameRate(60);
	m = {};
	m.llx = 0;
	m.lly = 0;
	m.lx = 0;
	m.ly = 0;
	m.down = false;
	touchtrack = [false, 0];
}

function draw() {

	clear();
	m.x = f(mouseX * IX / CX);
	m.y = f(mouseY * IY / CY);

	img.loadPixels();
	txt("LHF", 5, 5, (255, 255, 255));
	drawcontrol("lpf");
	drawcontrol("hpf");
	drawcontrol("lhf");
	drawcontrol("toggle"); 
	txt(controls.toggle[3],50,50,(255,255,255));
	if (frameCount % 20 == 0) { 
		txt(f(frameRate()), 1, IY * 0.95, (255, 255, 255));
	}

	touchtrack[0] = false;
	for (var i = 0; i < img.pixels.length / 4; i++) {
		j = i * 4;
		y = f(i / IX);
		x = f(i - (y * IX));

		for (var l = 0; l < Object.keys(keys).length; l++) {
			if (s(keys[Object.keys(keys)[l]].s)) {

				if (x == m.x && y == m.y) {
					keys[Object.keys(keys)[l]].touching = true;
					touchtrack = [true, l];
				}
				if (keys[Object.keys(keys)[l]].touching == true && touchtrack[1] != l) {
					keys[Object.keys(keys)[l]].touching = false;
				}

				if (keys[Object.keys(keys)[l]].touching == true) {
					if (m.down == true) {
						img.pixels[j] = keys[Object.keys(keys)[l]].color[0] - 100;
						img.pixels[j + 1] = keys[Object.keys(keys)[l]].color[1] - 100;
						img.pixels[j + 2] = keys[Object.keys(keys)[l]].color[2] - 100;
						keys[Object.keys(keys)[l]].pressed = true;
					} else {
						img.pixels[j] = keys[Object.keys(keys)[l]].color[0] - 50;
						img.pixels[j + 1] = keys[Object.keys(keys)[l]].color[1] - 50;
						img.pixels[j + 2] = keys[Object.keys(keys)[l]].color[2] - 50;
					}
				} else {
					img.pixels[j] = keys[Object.keys(keys)[l]].color[0];
					img.pixels[j + 1] = keys[Object.keys(keys)[l]].color[1];
					img.pixels[j + 2] = keys[Object.keys(keys)[l]].color[2];
				}

			}

		}


		if (y == f(m.ly) && x == f(m.lx) && (m.lx != m.llx || m.ly != m.lly)) {
			// img.pixels[j] = 0;
			// img.pixels[j + 1] = 0;
			// img.pixels[j + 2] = 0;
			bline(m.lx, m.ly, m.llx, m.lly, 0, 0, 0);
		}
		if (y == f(m.y) && x == f(m.x)) {
			// img.pixels[j] = 255;
			// img.pixels[j + 1] = 255;
			// img.pixels[j + 2] = 255;
			if (m.down == true) {

				bline(m.x, m.y, m.lx, m.ly, 255, 0, 0);
			} else {
				bline(m.x, m.y, m.lx, m.ly, 0, 255, 255);
			}
		}



	}
	for (var n = 0; n < Object.keys(controls).length; n++) {

		var ct = controls[Object.keys(controls)[n]];
		if(ct[0]==1){
		var dist = Math.sqrt(Math.pow(ct[1] - ct[3], 2) + Math.pow(ct[2] - ct[4], 2));
		if ((m.x > ct[1] - 2 && m.x < ct[1] + 2) && m.y > ct[2] && m.y < ct[4] && m.down == true) {
			var num = 1-((m.y - ct[2]) / dist);
			ct[8]=Math.round(num * 10) / 10;
		}
	} else if(ct[0]==2){
		if(m.x>=ct[1]-1&&m.x<=ct[1]+1&&m.y>=ct[1]-1&&m.y<=ct[1]+1&&m.down==true){	
			ct[3]= !ct[3];
			// if(ct[3]==true){
			// 	ct[3]=false;
			// } else if(ct[3]==false){
			// 	ct[3]=true;
			// }
		}
	}
	}
	if (touchtrack[0] == false) {
		keys[Object.keys(keys)[touchtrack[1]]].touching = false;
		touchtrack = [false, 0];
	}
	// console.log(mouseDown());

	img.updatePixels();
	image(img, 0, 0, CX, CY, 0, 0);
	// console.log(frameRate());
	m.llx = m.lx;
	m.lly = m.ly;
	m.lx = m.x;
	m.ly = m.y;
}

function f(xx) {
	return Math.floor(xx);
}

function s(xmin) {
	for (var i = 0; i < xmin.length; i++) {
		if (x > f((IX * xmin[i][0]) * 0.01) && x < f((IX * xmin[i][1]) * 0.01) && y > f((IY * xmin[i][2]) * 0.01) && y < f((IY * xmin[i][3]) * 0.01)) {
			return true;
		}
	}
}

function checks(xmin, xx, yy) {
	for (var i = 0; i < xmin.length; i++) {
		if (xx > f((IX * xmin[i][0]) * 0.01) && xx < f((IX * xmin[i][1]) * 0.01) && yy > f((IY * xmin[i][2]) * 0.01) && yy < f((IY * xmin[i][3]) * 0.01)) {
			return true;
		}
	}
}

function ss(xmin, xmax, ymin, ymax) {
	if (x > f((IX * xmin) * 0.01) && x < f((IX * xmax) * 0.01) && y > f((IY * ymin) * 0.01) && y < f((IY * ymax) * 0.01)) {
		return true;
	}
}

function bline(x0, y0, x1, y1, c1, c2, c3) {
	var dx = Math.abs(x1 - x0);
	var dy = Math.abs(y1 - y0);
	var sx = (x0 < x1) ? 1 : -1;
	var sy = (y0 < y1) ? 1 : -1;
	var err = dx - dy;

	while (true) {
		img.set(x0, y0, color(c1, c2, c3));

		if ((x0 == x1) && (y0 == y1)) break;
		var e2 = 2 * err;
		if (e2 > -dy) {
			err -= dy;
			x0 += sx;
		}
		if (e2 < dx) {
			err += dx;
			y0 += sy;
		}
	}
}


function mousePressed() {
	m.down = true;
}

function mouseReleased() {
	m.down = false;
}

function drawcontrol(name) {
	var ct = controls[name];
	if(ct[0]==1){
	var dist = Math.sqrt(Math.pow(ct[1] - ct[3], 2) + Math.pow(ct[2] - ct[4], 2));

	bline(ct[1], ct[2], ct[3], ct[4], 55, 55, 55);
	img.set(ct[1], ct[2] + dist * (1-ct[8]), color(ct[9][0], ct[9][1], ct[9][2]));
	img.set(ct[1] + 1, ct[2] + dist * (1-ct[8]), color(155, 155, 155));
	// img.set(ct[0] + 2, ct[1] + dist * ct[7], color(155, 155, 155));
	img.set(ct[1] - 1, ct[2] + dist * (1-ct[8]), color(155, 155, 155));

	bline(ct[1] + 1, ct[2], ct[3] + 1, f(ct[2] + dist * (1-ct[8]) - 1), 0, 0, 0);
	bline(ct[1] - 1, ct[2], ct[3] - 1, f(ct[2] + dist * (1-ct[8]) - 1), 0, 0, 0);
	bline(ct[1] - 1, ct[4], ct[3] - 1, f(ct[2] + dist * (1-ct[8]) + 1), 0, 0, 0);
	bline(ct[1] + 1, ct[4], ct[3] + 1, f(ct[2] + dist * (1-ct[8]) + 1), 0, 0, 0);
} else if(ct[0]==2){
    img.set(ct[1]+1,  ct[2]-1,color(155, 155, 155));
	img.set(ct[1]-1,  ct[2]-1,color(155, 155, 155));
	img.set(ct[1]-1,  ct[2]+1,color(155, 155, 155));
	img.set(ct[1]+1,  ct[2]+1,color(155, 155, 155));

	if(ct[3]==false){
	img.set(ct[1]+1,ct[2],color(ct[4][0], ct[4][1], ct[4][2]));
	img.set(ct[1],  ct[2]-1,color(ct[4][0], ct[4][1], ct[4][2]));
	img.set(ct[1]-1,ct[2],color(ct[4][0], ct[4][1], ct[4][2]));
	img.set(ct[1],  ct[2]+1,color(ct[4][0], ct[4][1], ct[4][2]));
	img.set(ct[1],ct[2],color(ct[4][0], ct[4][1], ct[4][2]));
} else 	if(ct[3]==true){
	img.set(ct[1]+1,ct[2],color(ct[5][0], ct[5][1], ct[5][2]));
	img.set(ct[1],  ct[2]-1,color(ct[5][0], ct[5][1], ct[5][2]));
	img.set(ct[1]-1,ct[2],color(ct[5][0], ct[5][1], ct[5][2]));
	img.set(ct[1],  ct[2]+1,color(ct[5][0], ct[5][1], ct[5][2]));
	img.set(ct[1],ct[2],color(ct[5][0], ct[5][1], ct[5][2]));
}
}

}

function txt(text, xx, yy, colour) {

	var texts = text.toString().toUpperCase().split("");

	for (var o = 0; o < texts.length; o++) {

		// if(texts[o]==
		for (var q = 0; q < 15; q++) {
			img.set(xx + (q % 3) + (o * 4), yy + f(q / 3), color(0));
		}
		for (var p = 0; p < lett[texts[o]].length; p++) {

			if (lett[texts[o]][p] == 1) {
				img.set(xx + (p % 3) + (o * 4), yy + f(p / 3), color(colour));
			}
		}

	}
}

const lett = {
	A: [0, 1, 0,
		1, 0, 1,
		1, 1, 1,
		1, 0, 1,
		1, 0, 1],
	B: [1, 1, 0,
		1, 0, 1,
		1, 1, 0,
		1, 0, 1,
		1, 1, 0],
	C: [0, 1, 1,
		1, 0, 0,
		1, 0, 0,
		1, 0, 0,
		0, 1, 1],
	D: [1, 1, 0,
		1, 0, 1,
		1, 0, 1,
		1, 0, 1,
		1, 1, 0],
	E: [1, 1, 1,
		1, 0, 0,
		1, 1, 1,
		1, 0, 0,
		1, 1, 1],
	F: [1, 1, 1,
		1, 0, 0,
		1, 1, 1,
		1, 0, 0,
		1, 0, 0],
	G: [0, 1, 1,
		1, 0, 0,
		1, 0, 1,
		1, 0, 1,
		0, 1, 1],
	H: [1, 0, 1,
		1, 0, 1,
		1, 1, 1,
		1, 0, 1,
		1, 0, 1],
	I: [1, 1, 1,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
		1, 1, 1],
	J: [1, 1, 1,
		0, 0, 1,
		0, 0, 1,
		1, 0, 1,
		0, 1, 0],
	K: [1, 0, 1,
		1, 0, 1,
		1, 1, 0,
		1, 0, 1,
		1, 0, 1],
	L: [1, 0, 0,
		1, 0, 0,
		1, 0, 0,
		1, 0, 0,
		1, 1, 1],
	M: [1, 0, 1,
		1, 1, 1,
		1, 1, 1,
		1, 0, 1,
		1, 0, 1],
	N: [0, 1, 1,
		1, 0, 1,
		1, 0, 1,
		1, 0, 1,
		1, 0, 1],
	O: [1, 1, 1,
		1, 0, 1,
		1, 0, 1,
		1, 0, 1,
		1, 1, 1],
	P: [1, 1, 1,
		1, 0, 1,
		1, 1, 1,
		1, 0, 0,
		1, 0, 0],
	Q: [1, 1, 1,
		1, 0, 1,
		1, 0, 1,
		1, 1, 1,
		0, 0, 1],
	R: [1, 1, 1,
		1, 0, 1,
		1, 1, 0,
		1, 0, 1,
		1, 0, 1],
	S: [1, 1, 1,
		1, 0, 0,
		1, 1, 1,
		0, 0, 1,
		1, 1, 1],
	T: [1, 1, 1,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0],
	U: [1, 0, 1,
		1, 0, 1,
		1, 0, 1,
		1, 0, 1,
		1, 1, 1],
	V: [1, 0, 1,
		1, 0, 1,
		1, 0, 1,
		1, 0, 1,
		0, 1, 0],
	W: [1, 0, 1,
		1, 0, 1,
		1, 1, 1,
		1, 1, 1,
		1, 0, 1],
	X: [1, 0, 1,
		1, 0, 1,
		0, 1, 0,
		1, 0, 1,
		1, 0, 1],
	y: [1, 0, 1,
		1, 0, 1,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0],
	Z: [1, 1, 1,
		0, 0, 1,
		0, 1, 0,
		1, 0, 0,
		1, 1, 1],
	"0": [1, 1, 1,
		1, 0, 1,
		1, 0, 1,
		1, 0, 1,
		1, 1, 1],
	"1": [1, 1, 0,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
		1, 1, 1],
	"2": [1, 1, 1,
		0, 0, 1,
		1, 1, 1,
		1, 0, 0,
		1, 1, 1],
	"3": [1, 1, 1,
		0, 0, 1,
		0, 1, 1,
		0, 0, 1,
		1, 1, 1],
	"4": [1, 0, 1,
		1, 0, 1,
		1, 1, 1,
		0, 0, 1,
		0, 0, 1],
	"5": [1, 1, 1,
		1, 0, 0,
		1, 1, 1,
		0, 0, 1,
		1, 1, 1],
	"6": [1, 1, 1,
		1, 0, 0,
		1, 1, 1,
		1, 0, 1,
		1, 1, 1],
	"7": [1, 1, 1,
		0, 0, 1,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0],
	"8": [1, 1, 1,
		1, 0, 1,
		1, 1, 1,
		1, 0, 1,
		1, 1, 1],
	"9": [1, 1, 1,
		1, 0, 1,
		1, 1, 1,
		0, 0, 1,
		1, 1, 1],
	".": [0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		0, 0, 0,
		1, 0, 0],

};

//√((x2 – x1)² + (y2 – y1)²)