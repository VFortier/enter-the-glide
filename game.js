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
        this.car = new Car(this.race.getStartPosition(), this.race.getStartAngle())
        this.camera = new Camera()
        
        this.timer = new Timer()
        this.timer.start()
        this.gameGui = new GameGui(this.timer)
    }

    this.draw = function() {

        switch(this.state) {
            case this.states.PLAYING:
                this._drawPlaying()
                break;
            case this.states.END_RACE:
                this._drawEndRace()
                break;
        }
    }

    this._drawPlaying = function() {
        this.handleKeypress()

        if (this.car.touchesFinishLine(this.race)) {
            this.state = this.states.END_RACE
            this.timer.stop()
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

    this._drawEndRace = function() {
        this.handleKeypress()
    
        if (!this.car.handleCollision(this.race)) {
            this.car.move()
            this.car.rotate(15)
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
			this.timer.start()
			this.car.moveToStart()
            this.state = this.states.PLAYING
		}
    }
}