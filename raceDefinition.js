(() => {

	raceDefinition = function() {
		return {
			startAngle: 270,
			startWidth: 200,
			collisionMode: "BUMP", // "BUMP" or "DEATH" or "LOL_YOU_DIED"
			segments: [
				{
					angleDiff: 0,
					length: 400,
					endWidth: 200,
					// Use this in any segment to spawn there (for testing)
					// debugSpawn: true,
				},
				{
					angleDiff: -45,
					length: 100,
					endWidth: 200,
				},
				{
					angleDiff: -45,
					length: 200,
					endWidth: 200,
				},
				{
					angleDiff: 90,
					length: 300,
					endWidth: 200,
				},
				{
					angleDiff: 22.5,
					length: 200,
					endWidth: 200,
				},
				{
					angleDiff: 22.5,
					length: 200,
					endWidth: 200,
				},
				{
					angleDiff: 22.5,
					length: 200,
					endWidth: 200,
				},
				{
					angleDiff: 22.5,
					length: 500,
					endWidth: 200,
				},
				{
					angleDiff: 0,
					length: 500,
					endWidth: 500,
				},
				{
					angleDiff: -90,
					length: 800,
					endWidth: 500,
				},
				{
					angleDiff: -90,
					length: 300,
					endWidth: 500,
				},
				{
					angleDiff: 0,
					length: 600,
					endWidth: 165,
				},
				{
					angleDiff: 0,
					length: 600,
					endWidth: 400,
				},
				{
					angleDiff: 11.25,
					length: 400,
					endWidth: 500,
				},
				{
					angleDiff: 11.25,
					length: 400,
					endWidth: 500,
				},
				{
					angleDiff: 11.25,
					length: 400,
					endWidth: 500,
				},
				{
					angleDiff: 11.25,
					length: 400,
					endWidth: 500,
				},
				{
					angleDiff: 11.25,
					length: 400,
					endWidth: 500,
				},
				{
					angleDiff: 11.25,
					length: 400,
					endWidth: 500,
				},
				{
					angleDiff: 11.25,
					length: 400,
					endWidth: 500,
				},
				{
					angleDiff: 11.25,
					length: 600,
					endWidth: 700,
				},
				{
					angleDiff: 90,
					length: 500,
					endWidth: 700,
				},
				{
					angleDiff: 0,
					length: 500,
					endWidth: 300,
				},



				// SLALOM
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: 9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 80,
					endWidth: 300,
				},
				{
					angleDiff: -9,
					length: 1000,
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