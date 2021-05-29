class Background {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;
    this.h = this.ctx.canvas.height;
    this.w = this.ctx.canvas.width;

    this.vx = -3;

    this.img = new Image();
    this.img.src = "./assets/img/background_18.png";
    this.img.isReady = false;
    this.img.onload = () => {
      this.img.isReady = true;
    };
  }

  isReady() {
    return this.img.isReady;
  }

  draw() {
    if (this.isReady()) {
      this.ctx.drawImage(this.img, this.x, 0, this.w, this.h);

      this.ctx.drawImage(this.img, this.x + this.w, 0, this.w, this.h);
    }
  }

  move() {
    this.x += this.vx;

    if (this.x + this.w <= 0) {
      this.x = 0;
    }
  }
}
