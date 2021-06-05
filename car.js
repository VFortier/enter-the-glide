function Car(startPosition) {
	// Physics
	this.ACCEL_VAL = 0.08
	this.DIRECTION_DIFF = 3
	this.CAR_SIZE = 50
	this.COLLISION_DECEL = 0.35

	this.startPos = startPosition

	this.position = createVector(startPosition.x, startPosition.y)
	this.accel = createVector(0,0)
	this.direction = 270 // in degrees
	this.isAccel = false

	// Graphic
	this.CAR_COLOR = color(0)
	this.TRAIL_COLOR = color(0, 255, 255)
	this.MOTOR_COLOR_OFF = color(143, 52, 0)
	this.MOTOR_COLOR_ON = color(255, 92, 0)

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
	}

	this.move = function() {
		this.position.add(this.accel)
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

		console.log(this.TRAIL_COLOR)

		push()
		noStroke()

		translate(trailVect)
		trailColor.setAlpha(80)
		fill(this.TRAIL_COLOR)
		circle(CANVAS_W/2, CANVAS_H/2, 50)

		translate(trailVect)
		trailColor.setAlpha(50)
		fill(this.TRAIL_COLOR)
		circle(CANVAS_W/2, CANVAS_H/2, 50)

		translate(trailVect)
		trailColor.setAlpha(20)
		fill(this.TRAIL_COLOR)
		circle(CANVAS_W/2, CANVAS_H/2, 50)

		pop()
	}

	this.getPosition = function() {
		return this.position
	}

	this.handleCollision = function(race) {
		hasCollision = false;

		// TODO - Handle double collison i.e. corner
		// TODO - Handle single point of collision
		previousPoint = null
		race.getRacePts().forEach(point => {
			if (previousPoint) {

				intersectionPts = CollisionHelper.intersectLineCircle(point, previousPoint, this.position, this.CAR_SIZE/2)

				if (intersectionPts.length === 2) {
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
			}
			
			previousPoint = point
		})

		return hasCollision
	}
}
