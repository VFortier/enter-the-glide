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

	race = new Race()
	car = new Car(race.getStartPosition())
	camera = new Camera()
	
	timer = new Timer()
	timer.start()
	gui = new Gui(timer)
	menu = new Menu(car, timer)
}

function draw() {
	background(50);

	menu.handleKeypress()
	
	if (!car.handleCollision(race)) {
		car.handleKeypress()
		car.move()
	}
	timer.updateTimer()

	push()  
	camera.centerScreen(car.getPosition())
	race.draw()
	pop()

	car.draw()
	gui.draw()


}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	CANVAS_W = windowWidth;
	CANVAS_H = windowHeight;
}

function Menu(car, timer) {
	this.car = car
	this.timer = timer

	this.handleKeypress = function() {
		if (keyIsDown(R_KEY)) {
			timer.start()
			car.moveToStart()
		}
	}
}

function Camera() {
	this.centerScreen = function(carPosition) {
		translate(
			-(carPosition.x - (CANVAS_W/2)),
			-(carPosition.y - (CANVAS_H/2))
		)
	}
}

function Timer() {
	this.timeStartedAt = null;
	this.timerValue = 0;
	this.isRunning = false;

	this.start = function() {
		this.timeStartedAt = Date.now()
		this.isRunning = true
	}

	this.stop = function() {
		this.isRunning = false
	}
	
	this.updateTimer = function() {
		if (this.isRunning) {
			this.timerValue = Date.now() - this.timeStartedAt
		}
	}

	this.getFormattedTime = function() {
		// Can't believe I'm doing this myself LOL - seems easier than getting a library (???)
		let ms = (this.timerValue % 1000)
		let cs = (ms - (ms % 10)) / 10
		let s = ((this.timerValue - ms) % (60 * 1000)) / 1000
		let m = (this.timerValue - (s*1000 + ms)) / (60 * 1000)

		cs = (cs < 10) ? "0" + cs : cs
		s = (s < 10) ? "0" + s : s
		m = (m < 10) ? "0" + m : m

		return `${m}:${s}:${cs}`
	}
}

function Gui(timer) {
	this.timer = timer

	this.draw = function() {
		stroke(255)
		fill(255)

		strokeWeight(1)
		textSize(20);
		text(`Time: ${this.timer.getFormattedTime()}`, 8, 20)
	}
}