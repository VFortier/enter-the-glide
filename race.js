function Race() {
	this.CAR_START_GAP = 50
	this.FINISH_AREA_COLOR = color(0, 200, 255, 50)

	this.raceDefinition = raceDefinition();
	this.segments = [];
	this.finishLinePts = [];
	this.carStartPosition = null;
	this.collisionModes = {
		DEATH: "DEATH",
		BUMP: "BUMP",
		LOL_YOU_DIED: "LOL_YOU_DIED",
	};
	this.collisionMode = null;

	// Can be calculated from segments - stored for performance
	this.cachedBorderLines = null;

	this.init = function() {
		segments = this.raceDefinition.segments
		previousSegment = null
		curAngle = this.raceDefinition.startAngle
		racePts1 = []
		racePts2 = []

		this.collisionMode = this.raceDefinition.collisionMode

		// Calc first center point
		centerPt = createVector(0, 0)
		segments[0].centerLinePt1 = centerPt

		// Calc first race point
		racePtVect = centerPt.copy().add(this.raceDefinition.startWidth/2, 0)
		borderPt1 = racePtVect.copy().rotate(curAngle - 90)
		borderPt2 = racePtVect.copy().rotate(curAngle + 90)

		segments[0].border1Pt1 = borderPt1
		segments[0].border2Pt1 = borderPt2

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

			// Calc border point
			nextSegAngle = nextSegment ? nextSegment.angleDiff : 0;

			angleFromCenterPt = (180 - nextSegAngle) / 2

			distFromCenterPt = halfSegWidth / sin(angleFromCenterPt)
			// console.log(`halfSegWidth ${halfSegWidth}`)
			// console.log(`angleFromCenterPt ${angleFromCenterPt}`)
			// console.log(`distFromCenterPt ${distFromCenterPt}`)

			racePtVect = createVector(distFromCenterPt, 0)
			racePtVect.rotate(curAngle - 90 + nextSegAngle/2)

			borderPt1 = centerPt.copy().add(racePtVect)
			borderPt2 = centerPt.copy().add(racePtVect.rotate(180))

			segment.border1Pt2 = borderPt1;
			segment.border2Pt2 = borderPt2
			if (nextSegment) {
				nextSegment.border1Pt1 = borderPt1;
				nextSegment.border2Pt1 = borderPt2;
			}

			// Calc finish line pts
			if (index == segments.length - 2) {
				this.finishLinePts.push(borderPt1)
				this.finishLinePts.push(borderPt2)
			}

			// Calc debug start position
			if (segment.debugSpawn) {
				this.carStartPosition = centerPt
				this.carStartAngle = curAngle + nextSegment.angleDiff
			}
		});

		this.segments = this.raceDefinition.segments

		// Calc carStartPosition
		if (!this.carStartPosition) {
			this.carStartPosition = createVector(this.CAR_START_GAP, 0)
			this.carStartPosition.rotate(this.raceDefinition.startAngle)
			this.carStartAngle = this.raceDefinition.startAngle
		}
	}


	this.getStartPosition = function() {
		return this.carStartPosition
	}
	this.getStartAngle = function() {
		return this.carStartAngle
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

	this.getFinishLinePts = function() {
		return this.finishLinePts;
	}

	this.draw = function() {
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

		// Draw finish area
		lastSegment = this.segments[this.segments.length - 1]

		noStroke()
		fill(this.FINISH_AREA_COLOR)
		beginShape();
		vertex(lastSegment.border1Pt1.x, lastSegment.border1Pt1.y);
		vertex(lastSegment.border1Pt2.x, lastSegment.border1Pt2.y);
		vertex(lastSegment.border2Pt2.x, lastSegment.border2Pt2.y);
		vertex(lastSegment.border2Pt1.x, lastSegment.border2Pt1.y);
		endShape(CLOSE);
	}
}
