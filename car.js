function Car(startPosition, startAngle) {
	this.states = {
		ENJOYING_LIFE: "ENJOYING_LIFE",
		EXPLODING: "EXPLODING",
		RESPAWNING: "RESPAWNING",
	}
	this.state = this.states.ENJOYING_LIFE

	// Physics
	this.ACCEL_VAL = 0.1
	this.DIRECTION_DIFF = 6
	this.CAR_SIZE = 30
	this.COLLISION_DECEL = 0.35

	this.startPos = startPosition

	this.position = createVector(startPosition.x, startPosition.y)
	this.accel = createVector(0,0)
	this.direction = startAngle // in degrees
	this.isAccel = false

	// Graphic
	this.CAR_COLOR = color(0)
	this.TRAIL_COLOR = color(0, 255, 255)
	this.MOTOR_COLOR_OFF = color(143, 52, 0)
	this.MOTOR_COLOR_ON = color(255, 92, 0)

	this.handleMovement = function(race) {
		if (race.collisionMode === race.collisionModes.DEATH) {
			if (this.state == this.states.ENJOYING_LIFE) {
				if (!this.handleDeathCollision(race)) {
					this.move()
				}
			}

		} else if (race.collisionMode === race.collisionModes.LOL_YOU_DIED) {
			// TODO
			if (!this.handleBumpCollision(race)) {
				this.move()
			}
		} else if (race.collisionMode === race.collisionModes.BUMP) {
			if (!this.handleBumpCollision(race)) {
				this.move()
			}
		}
	}

	this.handleKeypress = function() {
		if (keyIsDown(LEFT_ARROW)) {
			this.direction -= this.DIRECTION_DIFF
		}

		if (keyIsDown(RIGHT_ARROW)) {
			this.direction += this.DIRECTION_DIFF
		}

		if (keyIsDown(UP_ARROW)) {
			this.isAccel = true

			accelVect = createVector(this.ACCEL_VAL, 0)
			accelVect.rotate(this.direction)
			this.accel.add(accelVect)
		} else {
			this.isAccel = false
		}
	}

	this.moveToStart = function() {
		this.position = this.startPos.copy()
		this.accel = createVector(0,0)
		this.direction = 270
	}

	this.move = function() {
		this.position.add(this.accel)
	}

	this.rotate = function(angle) {
		this.direction += angle
	}

	this.draw = function() {
		this._drawTrail()

		noStroke()
		fill(this.CAR_COLOR)

		centerX = CANVAS_W/2
		centerY = CANVAS_H/2

		// Car "bg"
		circle(centerX, centerY, this.CAR_SIZE)

		// Car's backburner (arc)
		center = createVector(centerX, centerY)
		this.isAccel ? fill(this.MOTOR_COLOR_ON) : fill(this.MOTOR_COLOR_OFF)
		backburnerMidAngle = this.direction + 180
		arc(centerX, centerY, this.CAR_SIZE, this.CAR_SIZE, backburnerMidAngle - 45, backburnerMidAngle + 45)

		// Car's backburner (hide arc's center)
		fill(this.CAR_COLOR)
		circle(centerX, centerY, this.CAR_SIZE/2)
	}

	this._drawTrail = function() {
		trailVect = this.accel.copy().mult(-2)
		trailColor = this.TRAIL_COLOR

		push()
		noStroke()

		translate(trailVect)
		trailColor.setAlpha(80)
		fill(this.TRAIL_COLOR)
		circle(CANVAS_W/2, CANVAS_H/2, this.CAR_SIZE)

		translate(trailVect)
		trailColor.setAlpha(50)
		fill(this.TRAIL_COLOR)
		circle(CANVAS_W/2, CANVAS_H/2, this.CAR_SIZE)

		translate(trailVect)
		trailColor.setAlpha(20)
		fill(this.TRAIL_COLOR)
		circle(CANVAS_W/2, CANVAS_H/2, this.CAR_SIZE)

		pop()
	}

	this.getPosition = function() {
		return this.position
	}

	this.getCollisionPts = function(race) {
		intersectionPts = []

		race.getBorderLines().forEach(borderLinePts => {
			borderLineIntersectionPts = CollisionHelper.intersectLineCircle(borderLinePts[0], borderLinePts[1], this.position, this.CAR_SIZE/2)

			if (borderLineIntersectionPts.length != 0) {
				intersectionPts = intersectionPts.concat(borderLineIntersectionPts)
			}
		})

		return intersectionPts;
	}

	this.handleBumpCollision = function(race) {
		hasCollision = false;

		intersectionPts = this.getCollisionPts(race);

		// TODO - Handle double collison i.e. corner
		// TODO - Handle single point of collision
		if (intersectionPts.length >= 2) {
			hasCollision = true;

			intersectDiff = intersectionPts[0].copy().sub(intersectionPts[1])
			centerIntersect = intersectionPts[0].copy().sub(intersectDiff.mult(0.5))

			pushbackVect = this.position.copy().sub(centerIntersect)
			angleBetween = pushbackVect.angleBetween(this.accel)
			angleBetween -= 90

			this.accel.rotate(-angleBetween * 2)
			this.move()
			this.accel.mult(this.COLLISION_DECEL)
		}

		return hasCollision
	}

	this.handleDeathCollision = function(race) {
		hasCollision = false;

		intersectionPts = this.getCollisionPts(race);

		if (intersectionPts.length >= 1) {
			this.state = this.states.EXPLODING;
			// TODO - Start exploding animation
		}

		return hasCollision
	}

	this.touchesFinishLine = function(race) {
		finishLinePts = race.getFinishLinePts()

		intersectionPts = CollisionHelper.intersectLineCircle(finishLinePts[0], finishLinePts[1], this.position, this.CAR_SIZE/2)

		if (intersectionPts.length > 0) {
			return true;
		} else {
			return false;
		}
	}
}
