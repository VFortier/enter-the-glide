function Race() {
	this.START_POS = createVector(2700, 3600)
	this.RACE_PTS = [
			createVector(2500,3700),
			createVector(2500,2000),

			createVector(3300,2000),
			createVector(3300,1000),

			createVector(3800,1000),
			createVector(3800,2800),

			createVector(2900,2800),


			createVector(2900,3700),
			createVector(2500,3700),
		]


	this.RACE_DEFINITION = []

	this.getStartPosition = function() {
		return this.START_POS
	}

	this.getRacePts = function() {
		return this.RACE_PTS
	}

	this._drawBg = function() {
		strokeWeight(1)
		for (var i=0; i<ENV_W; i += 20) {
			stroke(100)
			line(i,0,i,ENV_H)
		}

		for (var i=0; i<ENV_H; i += 20) {
			stroke(100)
			line(0,i,ENV_W,i)
		}
	}

	this.draw = function() {
		this._drawBg()

		stroke(0)
		strokeWeight(3)

		previousPoint = null
		this.RACE_PTS.forEach(point => {
			if (previousPoint) {
				line(previousPoint.x, previousPoint.y, point.x, point.y)
			}
			
			previousPoint = point
		})
	}
}