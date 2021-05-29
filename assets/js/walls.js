class Pipe {
  constructor(ctx, x, y, height, vx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.height = height;
    this.size = 90;

    this.vx = vx;

    this.img = new Image();
    this.img.src = "./assets/img/wall.png";
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
      for (let i = 0; i < this.height; i += this.size) {
        this.ctx.drawImage(this.img, this.x, this.y + i, this.size, this.size);
      }
    }
  }

  move() {
    this.x += this.vx;
  }
}
