let x = 320;
let y = 180;
let xspeed = 5;
let yspeed = 2;

let r = 25;
let img;
let img_w = 0;
let img_h = 0;

// Hard-code some original image dimensions, even if we're working with SVG.
let orig_w = 221;
let orig_h = 289;
// This is the size of an ellipse that roughly matches the size of the brain.
let brain_collide_radius = 105;
// This is the distance from the center we need to place a "ball" where the
// brain is.
let orig_brain_y_offset = 72;

// First N brains will spawn other brains on collision
let num_spawning_brains = 4;
let max_brains = 200;

let all_x = [];
let all_y = [];
let all_xspeed = [];
let all_yspeed = [];
let all_scales = [];

let scale = 1;

function preload() {
	//img = loadImage('brain.png');
	img = loadImage('brain.svg');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	img_w = img.width;
	img_h = img.height;
	add_brain();
}

function add_brain() {
	if (all_x.length >= max_brains) {
		return;
	}
	var x = random(orig_w, windowWidth - orig_w);
	all_x[all_x.length] = x;

	var y = random(orig_w, windowHeight - orig_h);
	all_y[all_y.length] = y;

	var xspeed = random(3, 6);
	all_xspeed[all_xspeed.length] = xspeed;
	var yspeed = random(1, 2.5);
	all_yspeed[all_yspeed.length] = yspeed;
	all_scales[all_scales.length] = random(0.4, 0.8);

	// Had this to decrease scale after every new brain.
	//scale = scale - 0.01;
}

function render_image(collide_x, collide_y, scale) {
	//tint(255, 153, 204);
	image(img,
		  collide_x-(orig_w*scale/2),
		  collide_y-(orig_h*scale)/2+(72*scale),
		  orig_w*scale, orig_h*scale);
}

function update_speed(x, y, r) {
	var flipped = false;
	if (x > width - r || x < r) {
		xspeed = -xspeed;
		flipped = true;
	}
	if (y > height - r || y < r) {
		yspeed = -yspeed;
		flipped = true;
	}
}

function update_ith_speed(i) {
	var r = brain_collide_radius/2;
	r *= all_scales[i];
	var flipped = false;
	if (all_x[i] > width - r || all_x[i] < r) {
		all_xspeed[i] = -all_xspeed[i];
		flipped = true;
	}
	if (all_y[i] > height - r || all_y[i] < r) {
		all_yspeed[i] = -all_yspeed[i];
		flipped = true;
	}
	if ( flipped && i <= num_spawning_brains) {
		add_brain();
	}
}

function display_count() {
	fill(50, 168, 157);
	textSize(32);
	text(all_x.length, 10, 40);
}

function draw() {
	background(0);
	fill(190);

	for (i = 0; i < all_x.length; i++) {
		// draw
		// Uncomment to show collision box.
		//ellipse(all_x[i], all_y[i], brain_collide_radius, brain_collide_radius);
		render_image(all_x[i], all_y[i], all_scales[i]);
		// update pos
		all_x[i] += all_xspeed[i];
		all_y[i] += all_yspeed[i];
		// update speed
		update_ith_speed(i);
	}
	display_count()
}
