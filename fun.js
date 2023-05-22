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
		color: [255,255,255],
		touching: false
	},
	cs: {
		s: [
			[14, 18, 70, 80]
		],
		color: [255,0,0],
		touching: false
	},
	d: {
		s: [
			[16.25, 23, 80, 90],
			[18, 21.75, 70, 90]
		],
		color: [255,255,255],
		touching: false
	},
	ds: {
		s: [
			[21, 25, 70, 80]
		],
		color: [255,0,0],
		touching: false
	},
	e: {
		s: [
			[23, 29.25, 80, 90],
			[25, 29.25, 70, 90]
		],
		color: [255,255,255],
		touching: false
	},
	f: {
		s: [
			[29.25, 33, 70, 90],
			[29.25, 35.5, 80, 90]
		],
		color: [255,255,255],
		touching: false
	},
	fs: {
		s: [
			[33, 37, 70, 80]
		],
		color: [255,0,0],
		touching: false
	},
	g: {
		s: [
			[35.5, 42.25, 80, 90],
			[37, 40.75, 70, 90]
		],
		color: [255,255,255],
		touching: false
	},
	gs: {
		s: [
			[40.75, 44.75, 70, 80]
		],
		color: [255,0,0],
		touching: false
	},
	a: {
		s: [
			[42, 49, 80, 90],
			[44, 47.75, 70, 90]
		],
		color: [255,255,255],
		touching: false
	},
	as: {
		s: [
			[47.75, 51.75, 70, 80]
		],
		color: [255,0,0],
		touching: false
	},
	b: {
		s: [
			[49, 55.25, 80, 90],
			[51.75, 55.25, 70, 90]
		],
		color: [255,255,255],
		touching: false
	}
};

var cont = {
	slide : {
		sx:5,
		sy:40,
		ex:5,
		ey:50,
		min:0,
		max:100,
		inc:1,
		val:0.5
	}
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
	m = {};
	
	m.llx = 0;
	m.lly = 0;
	m.lx = 0;
	m.ly = 0;
	m.down=false;

}

function draw() {
	clear();
	m.x = f(mouseX * IX / CX);
	m.y = f(mouseY * IY / CY);
	
	img.loadPixels();
	drawcontrol("slide");

	for (var i = 0; i < img.pixels.length / 4; i++) {
		j = i * 4;
		y = f(i / IX);
		x = f(i - (y * IX));

for(var l=0;l<Object.keys(keys).length;l++){
		if (s(keys[Object.keys(keys)[l]].s)) {
			// if(x==m.x&&y==m.y){
			// 	keys[Object.keys(keys)[l]].touching=true;
			// } else {
			// 	keys[Object.keys(keys)[l]].touching=false;
			// }

			if(keys[Object.keys(keys)[l]].touching==true){
			img.pixels[j] = keys[Object.keys(keys)[l]].color[0];
			img.pixels[j + 1] = keys[Object.keys(keys)[l]].color[1];
			img.pixels[j + 2] = keys[Object.keys(keys)[l]].color[2];
			}else {
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
			if(m.down==true){

				bline(m.x, m.y, m.lx, m.ly, 255,0,0);
			} else {
			bline(m.x, m.y, m.lx, m.ly, 0, 255, 255);
		}
		}

		
	}
	

	img.updatePixels();
	image(img, 0, 0, CX, CY, 0, 0);
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

function checks(xmin,xx,yy) {
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

function drawcontrol(name){
	var ct=cont[name];
	var dist = Math.sqrt(Math.pow(ct.sx-ct.ex,2)+Math.pow(ct.sy-ct.ey,2));
	// if(x==cont[name].sx&&y==cont[name].sy){
	// img.pixels[j]=255;
	// }
	bline(ct.sx,ct.sy,ct.ex,ct.ey,55,55,55);
	bline(ct.sx+1,ct.sy,ct.ex+1,ct.ey,55,55,55);
	img.set(ct.sx, ct.sy+dist*ct.val, color(155,155,155));
	img.set(ct.sx+1, ct.sy+dist*ct.val, color(155,155,155));
	img.set(ct.sx+2, ct.sy+dist*ct.val, color(155,155,155));
	img.set(ct.sx-1, ct.sy+dist*ct.val, color(155,155,155));
	
}

//√((x2 – x1)² + (y2 – y1)²)