class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.fps = 1000 / 60;
    this.drawInterval = undefined;

    this.started = false;

    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx, 600, (this.canvas.height - 20) / 2);
    this.pipes = [];

    this.framesCount = 0;
    this.pipesSpeed = -3;

    this.points = 0;

    const theme = new Audio(
      "./assets/sound/yt1s.com - Workaday World  Comedy Background Music HD.mp3"
    );
    theme.volume = 0.1;

    this.sounds = {
      theme,
      collision: new Audio(
        "./assets/sound/yt1s.com - Funny Bye Bye  Sound Effect HD.mp3"
      ),
    };
  }

  hasStarted() {
    return this.started;
  }

  start() {
    this.started = true;
    if (!this.drawInterval) {
      this.sounds.theme.play();
      this.sounds.theme.loop = true;
      this.drawInterval = setInterval(() => {
        this.clear();

        this.move();

        this.draw();

        this.checkCollisions();
        this.framesCount++;

        if (this.framesCount % PIPES_FRAMES === 0) {
          this.addPairofPipes();
        }

        if (this.framesCount % SPEED_INCREMENT_FRAMES === 0) {
          this.pipesSpeed -= 1;
          this.pipes.forEach((pipe) => (pipe.vx = this.pipesSpeed));
        }
      }, this.fps);
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pipes = this.pipes.filter((pipe) => {
      if (pipe.x + pipe.size >= 0) {
        return true;
      } else {
        this.points += 0.5;
      }
    });
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.pipes.forEach((pipe) => pipe.draw());

    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.font = "35px Indie Flower";
    this.ctx.fillText(`Score: ${this.points}`, 50, 50);
    this.ctx.restore();
  }

  move() {
    this.background.move();
    this.player.move();
    this.pipes.forEach((pipe) => pipe.move());
  }

  onKeyEvent(event) {
    this.player.onKeyEvent(event);
  }

  addPairofPipes() {
    const minSpace = this.canvas.height - this.player.height * 1.5;

    const topHeight = Math.floor(Math.random() * minSpace);
    const bottomHeigth = Math.floor(Math.random() * (minSpace - topHeight));

    this.pipes.push(
      new Pipe(this.ctx, this.canvas.width, 0, topHeight, this.pipesSpeed),
      new Pipe(
        this.ctx,
        this.canvas.width,
        this.canvas.height - bottomHeigth,
        bottomHeigth,
        this.pipesSpeed
      )
    );
  }

  gameOver() {
    clearInterval(this.drawInterval);

    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "40px Indie Flower";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Game Over!  Refresh to Start!",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.restore();
    this.sounds.collision.play();
    this.sounds.theme.pause();
  }

  checkCollisions() {
    if (this.pipes.some((pipe) => this.player.collidesWith(pipe))) {
      this.gameOver();
    }
    if (this.player.fallsOut()) {
      this.gameOver();
    }
  }
}
