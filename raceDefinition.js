(() => {

	raceDefinition = function() {
		return {
			startAngle: 270,
			startWidth: 500,
			finishLineLegth: 300,
			collisionMode: "BUMP", // "BUMP" - "DEATH" TODO
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
					length: 1200,
					endWidth: 500,
				},
				{
					angleDiff: -22.5,
					length: 350,
					endWidth: 400,
				},
				{
					angleDiff: -22.5,
					length: 350,
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
				// Last segment is the finish area
				{
					angleDiff: 0,
					length: 300,
					endWidth: 300,
				},
			]
		}
	}
})();