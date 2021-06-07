function GameGui(timer) {
	this.timer = timer

	this.draw = function() {
		stroke(255)
		fill(255)

		strokeWeight(1)
		textSize(20);
		text(`Time: ${this.timer.getFormattedTime()}`, 8, 20)
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