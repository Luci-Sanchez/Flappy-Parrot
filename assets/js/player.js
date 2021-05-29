class Player {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.vx = 0;

    this.y = y;
    this.maxY = y;
    this.vy = 0;

    this.gravity = GRAVITY;

    this.width = 0;
    this.height = 0;

    this.sprite = new Image();
    this.sprite.src = "./assets/img/bird.png";
    this.sprite.isReady = false;
    this.sprite.horizontalFrames = 3;
    this.sprite.verticalFrames = 3;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.drawCount = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(
        this.sprite.width / this.sprite.horizontalFrames
      );
      this.sprite.frameHeight = Math.floor(
        this.sprite.height / this.sprite.verticalFrames
      );
      this.width = this.sprite.frameWidth / 2;
      this.height = this.sprite.frameHeight / 2;
    };

    this.movements = {
      fly: false,
    };
  }

  isReady() {
    return this.sprite.isReady;
  }

  clear() {}

  draw() {
    if (this.isReady()) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );

      this.sprite.drawCount++;
      this.animate();
    }
  }

  onKeyEvent(event) {
    const status = event.type === "keydown";
    switch (event.keyCode) {
      case KEY_FLY:
        this.movements.fly = status;
        break;
    }
  }

  move() {
    this.vy += GRAVITY;
    if (this.movements.fly) {
      this.vy = -5;
    }

    this.y += this.vy;
  }

  animate() {
    if (this.movements.fly) {
      this.animateFly();
      this.animateSprite();
    } else {
      this.resetAnimation();
    }
  }

  resetAnimation() {
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
  }

  animateFly() {
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 2;
  }

  animateSprite() {
    if (this.sprite.verticalFrameIndex !== 2) {
      this.sprite.verticalFrameIndex = 0;
      this.sprite.horizontalFrameIndex = 0;
    } else if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
      if (
        this.sprite.horizontalFrameIndex >=
        this.sprite.horizontalFrameIndex - 1
      ) {
        this.sprite.horizontalFrameIndex = 0;
      } else {
        this.sprite.horizontalFrameIndex++;
      }
      this.sprite.drawCount = 0;
    }
  }

  collidesWith(element) {
    return (
      this.x + 15 < element.x + element.size &&
      this.x - 15 + this.width > element.x &&
      this.y + 18 < element.y + element.height &&
      this.y - 22 + this.height > element.y
    );
  }

  fallsOut() {
    return this.y + this.height / 2 >= this.ctx.canvas.height || this.y <= 0;
  }

}
