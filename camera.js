function Camera() {
	this.centerScreen = function(carPosition) {
		translate(
			-(carPosition.x - (CANVAS_W/2)),
			-(carPosition.y - (CANVAS_H/2))
		)
	}
}