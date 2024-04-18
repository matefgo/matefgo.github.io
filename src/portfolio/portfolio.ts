import { AnimatedPage } from "../common/classes/animatedPage";
import { Canvas } from "../common/classes/canvas";
import "./style.css";

class Drop {
  x: number;
  size: number;
  velocity = 0;
  acceleration: number;
  hasStopped = false;

  constructor() {
    this.x = Math.random();
    this.acceleration = Math.random() * 0.01 + 0.01;
    this.size = Math.round(Math.random() * 45 + 5);
  }

  draw(ctx: CanvasRenderingContext2D, currentColor: string) {
    const radius = this.size / 2;
    const x = this.x * ctx.canvas.clientWidth;
    this.velocity = this.velocity + this.acceleration;

    const currentHeight = this.velocity * this.size;

    ctx.fillStyle = currentColor;

    ctx.beginPath();

    ctx.moveTo(x - this.size, 0);

    ctx.bezierCurveTo(
      x,
      0,
      x - radius / 2,
      this.size,
      x - radius,
      this.size + currentHeight
    );
    ctx.arc(
      x,
      this.size + currentHeight,
      radius,
      (210 * Math.PI) / 180,
      (-20 * Math.PI) / 180,
      true
    );
    ctx.bezierCurveTo(x + radius / 2, this.size, x, 0, x + this.size, 0);

    ctx.fill();

    ctx.closePath();

    if (currentHeight > ctx.canvas.clientHeight) {
      this.acceleration = 0;
      this.hasStopped = true;
    }
  }
}

export class Portfolio implements AnimatedPage {
  angle = 0;
  currentAnimationId = 0;
  backgroundColor = "hsl(219, 50%, 11%)";
  liquidColor = `hsl(${219}, 50%, 50%)`;
  liquidDisplacement: number;

  drops: Drop[] = [];

  canvas: Canvas;

  constructor() {
    this.canvas = new Canvas(".portfolio canvas");

    this.liquidDisplacement = this.canvas.heigth;

    this.generateDrops();

    this.drawDrops();
  }

  generateDrops() {
    const dropCount = 7 * Math.random() + 3;

    this.drops = Array.from({ length: dropCount }, () => {
      return new Drop();
    });
  }

  liquidFilling() {
    this.canvas.ctx.fillStyle = this.liquidColor;

    const radians = (this.angle * Math.PI) / 180;

    const liquidHeigth = this.liquidDisplacement;

    const heightOscilation = 10 * Math.sin(radians);

    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(0, liquidHeigth);
    this.canvas.ctx.quadraticCurveTo(
      this.canvas.width / 4,
      liquidHeigth + heightOscilation,
      this.canvas.width / 2,
      liquidHeigth
    );
    this.canvas.ctx.quadraticCurveTo(
      (3 * this.canvas.width) / 4,
      liquidHeigth - heightOscilation,
      this.canvas.width,
      liquidHeigth
    );
    this.canvas.ctx.lineTo(this.canvas.width, this.canvas.heigth);
    this.canvas.ctx.lineTo(0, this.canvas.heigth);

    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();

    this.angle += 3;
    this.liquidDisplacement -= 0.1;

    if (this.liquidDisplacement < -50) {
      this.liquidDisplacement = this.canvas.heigth;
      const temp = this.backgroundColor;
      this.backgroundColor = this.liquidColor;
      this.liquidColor = temp;

      this.generateDrops();
    }
  }

  drawDrops() {
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);

    this.canvas.ctx.fillStyle = this.backgroundColor;

    this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.heigth);

    for (const drop of this.drops) {
      drop.draw(this.canvas.ctx, this.liquidColor);
    }

    if (this.drops.some((drop) => drop.hasStopped)) {
      this.liquidFilling();
    }

    this.animateCanvas();
  }

  animateCanvas() {
    this.currentAnimationId = requestAnimationFrame(() => {
      this.drawDrops();
    });
  }

  stopAnimation() {
    cancelAnimationFrame(this.currentAnimationId);
  }
}
