(() => {
	CollisionHelper = {}

	// From https://stackoverflow.com/questions/57891494/how-to-calculate-intersection-point-of-a-line-on-a-circle-using-p5-js
	CollisionHelper.intersectLineCircle = function(p1, p2, cpt, r) {

		let sign = function(x) { return x < 0.0 ? -1 : 1; };

		let x1 = p1.copy().sub(cpt);
		let x2 = p2.copy().sub(cpt);

		let dv = x2.copy().sub(x1);
		let dr = dv.mag();
		let D = x1.x*x2.y - x2.x*x1.y;

		// evaluate if there is an intersection
		let di = r*r*dr*dr - D*D;
		if (di < 0.0)
			return [];

		let t = sqrt(di);

		ip = [];
		ip1 = new p5.Vector(D*dv.y + sign(dv.y)*dv.x * t, -D*dv.x + abs(dv.y) * t).div(dr*dr).add(cpt)

		if (CollisionHelper.ptsInBetween(p1, p2, ip1)) {
		ip.push( ip1 );
		}

		if (di > 0.0) {
			ip2 = new p5.Vector(D*dv.y - sign(dv.y)*dv.x * t, -D*dv.x - abs(dv.y) * t).div(dr*dr).add(cpt)

			if (CollisionHelper.ptsInBetween(p1, p2, ip1)) {
				ip.push( ip2 );
			}
		}
		return ip;
	}

	CollisionHelper.ptsInBetween = function(p1, p2, px) {

		let v = p2.copy().sub(p1);
		let d = v.mag();
		v = v.normalize();

		let vx = px.copy().sub(p1);
		let dx = v.dot(vx);

		return dx >= 0 && dx <= d;
	}

})()