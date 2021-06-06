(() => {

	raceDefinition = function() {
		return {
			startAngle: 270,
			collisionMode: "BUMP", // "BUMP" or "DEATH"
			segments: [
				{
					angleDiff: 0,
					length: 700,
					endWidth: 500,
				},
				{
					angleDiff: 90,
					length: 700,
					endWidth: 500,
				},
				{
					angleDiff: -90,
					length: 900,
					endWidth: 500,
				},
				{
					angleDiff: -45,
					length: 700,
					endWidth: 300,
				},
				{
					angleDiff: -45,
					length: 900,
					endWidth: 600,
				},
				{
					angleDiff: 0,
					length: 900,
					endWidth: 300,
				},
			]
		}
	}
})();