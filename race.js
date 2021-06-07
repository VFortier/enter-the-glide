function Race() {
	this.CAR_START_GAP = 50

	this.raceDefinition = raceDefinition();
	this.segments = [];
	this.finishLinePts = [];
	this.carStartPosition = createVector(0, 0);

	// Can be calculated from segments - store for performance
	this.cachedBorderLines = null;


	// Init / Constructor
	(() => {
		segments = this.raceDefinition.segments
		previousSegment = null
		curAngle = this.raceDefinition.startAngle
		racePts1 = []
		racePts2 = []

		// Calc first center point
		centerPt = createVector(0, 0)
		segments[0].centerLinePt1 = centerPt

		// Calc first race point
		racePtVect = centerPt.copy().add(this.raceDefinition.startWidth/2, 0)
		racePt1 = racePtVect.copy().rotate(curAngle - 90)
		racePt2 = racePtVect.copy().rotate(curAngle + 90)

		segments[0].border1Pt1 = racePt1
		segments[0].border2Pt1 = racePt2

		segments.forEach((segment, index) => {
			nextSegment = null
			if (index != segments.length - 1) {
				nextSegment = segments[index + 1]
			}

			curAngle += segment.angleDiff
			halfSegWidth = segment.endWidth / 2;

			// Calc center point
			segVect = createVector(segment.length, 0)
			segVect.rotate(curAngle)

			centerPt = segment.centerLinePt1.copy().add(segVect)
			segment.centerLinePt2 = centerPt;
			if (nextSegment) nextSegment.centerLinePt1 = centerPt;

			// Calc race point
			nextSegAngle = nextSegment ? nextSegment.angleDiff : 0;

			angleFromCenterPt = (180 - nextSegAngle) / 2

			distFromCenterPt = halfSegWidth / sin(angleFromCenterPt)
			// console.log(`halfSegWidth ${halfSegWidth}`)
			// console.log(`angleFromCenterPt ${angleFromCenterPt}`)
			// console.log(`distFromCenterPt ${distFromCenterPt}`)

			racePtVect = createVector(distFromCenterPt, 0)
			racePtVect.rotate(curAngle - 90 + nextSegAngle/2)

			racePt1 = centerPt.copy().add(racePtVect)
			racePt2 = centerPt.copy().add(racePtVect.rotate(180))

			segment.border1Pt2 = racePt1;
			segment.border2Pt2 = racePt2
			if (nextSegment) {
				nextSegment.border1Pt1 = racePt1;
				nextSegment.border2Pt1 = racePt2;
			}

			// Calc finish line pts
			if (index == segments.length - 2) {
				this.finishLinePts.push(racePt1)
				this.finishLinePts.push(racePt2)
			}
		});

		this.segments = this.raceDefinition.segments

		// Calc carStartPosition
		this.carStartPosition = createVector(this.CAR_START_GAP, 0)
		this.carStartPosition.rotate(this.raceDefinition.startAngle)
	})();


	this.getStartPosition = function() {
		return this.carStartPosition
	}

	this.getBorderLines = function() {
		if (!this.cachedBorderLines) {
			let borderLines = []
			this.segments.forEach((segment, index) => {
				if (index == 0) {
					borderLines.push([segment.border1Pt1, segment.border2Pt1])
				} else if (index == this.segments.length - 1) {
					borderLines.push([segment.border1Pt2, segment.border2Pt2])
				}
	
				borderLines.push([segment.border1Pt1, segment.border1Pt2])
				borderLines.push([segment.border2Pt1, segment.border2Pt2])
			})

			this.cachedBorderLines = borderLines
		}

		return this.cachedBorderLines;
	}

	this._drawBg = function() {
		// TODO - Move into a new "game" object
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

		this.segments.forEach((segment, index) => {
			// Draw borders
			stroke(0)
			strokeWeight(3)
			if (index == 0) {
				line(segment.border1Pt1.x, segment.border1Pt1.y, segment.border2Pt1.x, segment.border2Pt1.y)
			} else if (index == this.segments.length - 1) {
				line(segment.border1Pt2.x, segment.border1Pt2.y, segment.border2Pt2.x, segment.border2Pt2.y)
			}

			line(segment.border1Pt1.x, segment.border1Pt1.y, segment.border1Pt2.x, segment.border1Pt2.y)
			line(segment.border2Pt1.x, segment.border2Pt1.y, segment.border2Pt2.x, segment.border2Pt2.y)

			// Draw center line
			stroke(200, 100, 0)
			line(segment.centerLinePt1.x, segment.centerLinePt1.y, segment.centerLinePt2.x, segment.centerLinePt2.y)
			
		})
	}
}
