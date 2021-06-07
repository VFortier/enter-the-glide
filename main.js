var CANVAS_W = 0;
var CANVAS_H = 0;

const R_KEY = 82

var race
var car
var camera
var gui
var timer

function setup() {
	CANVAS_W = windowWidth;
	CANVAS_H = windowHeight;

	createCanvas(CANVAS_W, CANVAS_H);
	angleMode(DEGREES);

	game = new Game()
	game.init()
}

function draw() {
	game.draw()
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	CANVAS_W = windowWidth;
	CANVAS_H = windowHeight;
}