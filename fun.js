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
		]
	},
	cs: {
		s: [
			[14, 18, 70, 80]
		]
	},
	d: {
		s: [
			[16.25, 23, 80, 90],
			[18, 21.75, 70, 90]
		]
	},
	ds: {
		s: [
			[21, 25, 70, 80]
		]
	},
	e: {
		s: [
			[23, 29.25, 80, 90],
			[25, 29.25, 70, 90]
		]
	},
	f: {
		s: [
			[29.25, 33, 70, 90],
			[29.25, 35.5, 80, 90]
		]
	},
	fs: {
		s: [
			[33, 37, 70, 80]
		]
	},
	g: {
		s: [
			[35.5, 42.25, 80, 90],
			[37, 40.75, 70, 90]
		]
	},
	gs: {
		s: [
			[40.75, 44.75, 70, 80]
		]
	},
	a: {
		s: [
			[42, 49, 80, 90],
			[44, 47.75, 70, 90]
		]
	},
	as: {
		s: [
			[47.75, 51.75, 70, 80]
		]
	},
	b: {
		s: [
			[49, 55.25, 80, 90],
			[51.75, 55.25, 70, 90]
		]
	}
}


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
}

function draw() {
	clear();
	m.x = f(mouseX * IX / CX);
	m.y = f(mouseY * IY / CY);

	img.loadPixels();
	for (var i = 0; i < img.pixels.length / 4; i++) {
		j = i * 4;
		y = f(i / IX);
		x = f(i - (y * IX));


		if (s(keys.c.s) || s(keys.d.s) || s(keys.e.s) || s(keys.f.s) || s(keys.g.s) || s(keys.a.s) || s(keys.b.s)) {
			img.pixels[j] = 255;
			img.pixels[j + 1] = 255;
			img.pixels[j + 2] = 255;
		}

		if (s(keys.cs.s) || s(keys.ds.s) || s(keys.fs.s) || s(keys.gs.s) || s(keys.as.s)) {
			img.pixels[j] = 200;
		}
		if (y == f(m.ly) && x == f(m.lx) && (m.lx != m.llx || m.ly != m.lly)) {
			// img.pixels[j] = 0;
			// img.pixels[j + 1] = 0;
			// img.pixels[j + 2] = 0;
			bline(m.lx, m.ly, m.llx, m.lly, 0, 0, 0)
		}
		if (y == f(m.y) && x == f(m.x)) {
			// img.pixels[j] = 255;
			// img.pixels[j + 1] = 255;
			// img.pixels[j + 2] = 255;
			bline(m.x, m.y, m.lx, m.ly, 0, 255, 255)
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
