function Race() {
	this.CAR_START_GAP = 50

	this.raceDefinition = raceDefinition();
	this.racePts = [];
	this.centerLinePts = [];
	this.carStartPosition = createVector(0, 0);


	// Init / Constructor
	(() => {
		// Calc center line pts
		segments = this.raceDefinition.segments
		previousSegment = null
		curAngle = this.raceDefinition.startAngle
		racePts1 = []
		racePts2 = []

		// Calc first center point
		centerPt = createVector(0, 0)
		this.centerLinePts.push(centerPt)

		// Calc first race point
		racePtVect = centerPt.copy().add(this.raceDefinition.startWidth/2, 0)
		racePt1 = racePtVect.copy().rotate(curAngle - 90)
		racePt2 = racePtVect.copy().rotate(curAngle + 90)

		racePts1.push(racePt1)
		racePts2.unshift(racePt2)

		segments.forEach((segment, index) => {
			curAngle += segment.angleDiff
			halfSegWidth = segment.endWidth / 2;

			// Calc center point
			segVect = createVector(segment.length, 0)
			segVect.rotate(curAngle)

			previousCenterPt = this.centerLinePts[this.centerLinePts.length - 1]

			centerPt = previousCenterPt.copy().add(segVect)
			this.centerLinePts.push(centerPt)

			// Calc race point
			nextSegAngle = 0
			if (index != segments.length - 1) {
				nextSegment = segments[index + 1]
				nextSegAngle = nextSegment.angleDiff
			}

			angleFromCenterPt = (180 - nextSegAngle) / 2

			distFromCenterPt = halfSegWidth / sin(angleFromCenterPt)
			// console.log(`halfSegWidth ${halfSegWidth}`)
			// console.log(`angleFromCenterPt ${angleFromCenterPt}`)
			// console.log(`distFromCenterPt ${distFromCenterPt}`)

			racePtVect = createVector(distFromCenterPt, 0)
			racePtVect.rotate(curAngle - 90 + nextSegAngle/2)

			racePt1 = centerPt.copy().add(racePtVect)
			racePt2 = centerPt.copy().add(racePtVect.rotate(180))

			racePts1.push(racePt1)
			racePts2.unshift(racePt2)

		});

		this.racePts = racePts1.concat(racePts2);
		// Add the first point as a last point to loop the loop
		this.racePts.push(this.racePts[0]);

		// Calc carStartPosition
		this.carStartPosition = createVector(this.CAR_START_GAP, 0)
		this.carStartPosition.rotate(this.raceDefinition.startAngle)

		// Test
		// this.racePts = this.centerLinePts
		// this.carStartPosition = createVector(-200,0)

	})();


	this.getStartPosition = function() {
		return this.carStartPosition
	}

	this.getRacePts = function() {
		return this.racePts
	}

	this._drawBg = function() {
		strokeWeight(1)
		for (var i=-10000; i<10000; i += 20) {
			stroke(100)
			line(i,-10000,i,10000)
		}

		for (var i=-10000; i<10000; i += 20) {
			stroke(100)
			line(-10000,i,10000,i)
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

		// Debug - draw center line

		stroke(200, 100, 0)
		previousPoint = null
		this.centerLinePts.forEach(point => {
			if (previousPoint) {
				line(previousPoint.x, previousPoint.y, point.x, point.y)
			}
			
			previousPoint = point
		})
	}
}