function Game() {
    this.states = {
        PLAYING: "PLAYING",
        END_RACE: "END_RACE",
    }

    this.car = null;
    this.race = null;
    this.gameGui = null;
    this.state = this.states.PLAYING

    this.init = function() {
        this.race = new Race()
        this.car = new Car(this.race.getStartPosition())
        this.camera = new Camera()
        
        this.timer = new Timer()
        this.timer.start()
        this.gameGui = new GameGui(this.timer)
    }

    this.draw = function() {
        this.handleKeypress()

        if (this.car.touchesFinishLine()) {
            this.state = this.states.END_RACE
        }
        
        if (!this.car.handleCollision(this.race)) {
            this.car.handleKeypress()
            this.car.move()
        }
        this.timer.updateTimer()
    
        push()  
        this.camera.centerScreen(this.car.getPosition())
        this._drawBg()
        this.race.draw()
        pop()
    
        this.car.draw()
        this.gameGui.draw()
    }

    this._drawBg = function() {
        background(50);
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

    this.handleKeypress = function() {
		if (keyIsDown(R_KEY)) {
			timer.start()
			car.moveToStart()
            this.state = this.states.PLAYING
		}
    }
}