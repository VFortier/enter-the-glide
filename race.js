function Race() {
	this.raceDefinition = raceDefinition();
	this.racePts = [];
	this.centerLinePts = [];
	this.carStartPosition = null;


	// Init / Constructor
	(() => {
		// Calc center line pts
		segments = this.raceDefinition.segments
		previousSegment = null
		curAngle = this.raceDefinition.startAngle

		segments.forEach(segment => {
			if (!previousSegment) {
				this.centerLinePts.push(createVector(0, 0))
				previousSegment = segment
			} else {
				segVect = createVector(segment.length, 0)
				segVect.rotate(curAngle)

				previousPt = this.centerLinePts[this.centerLinePts.length - 1]

				curPt = previousPt.copy().add(segVect)
				this.centerLinePts.push(curPt)

				// For testing only mate
				this.racePts = this.centerLinePts
				curAngle += segment.angleDiff
			}
		});

		// Calc carStartPosition
		// Testing
		this.carStartPosition = createVector(-200, 0)

		// Calc racePts
	})();


	this.getStartPosition = function() {
		return this.carStartPosition
	}

	this.getRacePts = function() {
		return this.racePts
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
		this.racePts.forEach(point => {
			if (previousPoint) {
				line(previousPoint.x, previousPoint.y, point.x, point.y)
			}
			
			previousPoint = point
		})
	}
}