import { Canvas } from "../common/classes/canvas";
import "./style.css";

class Drop {
  x: number;
  size: number;
  velocity = 0;
  acceleration: number;

  constructor() {
    this.x = Math.random();
    this.acceleration = Math.random() * 0.01 + 0.1;
    this.size = Math.round(Math.random() * 45 + 5);
  }

  draw(ctx: CanvasRenderingContext2D, currentColor: string) {
    const radius = this.size / 2;
    const x = this.x * ctx.canvas.clientWidth;
    this.velocity = this.velocity + this.acceleration;

    const currentHeight = this.velocity * this.size;

    ctx.fillStyle = currentColor;

    ctx.beginPath();

    ctx.moveTo(x - radius, 0);

    ctx.arcTo(x, 0, x, radius, radius);
    ctx.arcTo(x, 0, x + radius, 0, radius);

    ctx.fill();

    ctx.closePath();

    ctx.beginPath();

    ctx.moveTo(x, currentHeight);
    ctx.bezierCurveTo(
      x - radius / 4,
      currentHeight + radius / 2,
      x - radius,
      currentHeight + radius,
      x - radius,
      currentHeight + 2 * radius
    );
    ctx.arcTo(
      x - radius,
      currentHeight + 3 * radius,
      x,
      currentHeight + 3 * radius,
      radius
    );
    ctx.arcTo(
      x + radius,
      currentHeight + 3 * radius,
      x + radius,
      currentHeight + radius,
      radius
    );
    ctx.bezierCurveTo(
      x + radius,
      currentHeight + radius,
      x + radius / 4,
      currentHeight + radius / 2,
      x,
      currentHeight
    );

    ctx.fill();

    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "white";

    ctx.fill();

    if (currentHeight > ctx.canvas.clientHeight) {
      this.velocity = 0;
    }
  }
}

export class Portfolio extends Canvas {
  angle = 0;
  currentAnimationId = 0;
  backgroundColor = "hsl(219, 100%, 11%)";
  liquidColor = `hsl(${219 - 180}, 100%, 50%)`;

  drops: Drop[] = [];

  constructor() {
    super(".portfolio canvas");

    const dropCount = 7 * Math.random() + 3;

    this.drops = Array.from({ length: dropCount }, () => {
      return new Drop();
    });

    this.drawDrops();
  }

  liquidDisplacement = this.heigth;

  liquidFilling() {
    this.ctx.fillStyle = this.liquidColor;

    const radians = (this.angle * Math.PI) / 180;

    const liquidHeigth = this.liquidDisplacement;

    const heightOscilation = 10 * Math.sin(radians);

    this.ctx.beginPath();
    this.ctx.moveTo(0, liquidHeigth);
    this.ctx.quadraticCurveTo(
      this.width / 4,
      liquidHeigth + heightOscilation,
      this.width / 2,
      liquidHeigth
    );
    this.ctx.quadraticCurveTo(
      (3 * this.width) / 4,
      liquidHeigth - heightOscilation,
      this.width,
      liquidHeigth
    );
    this.ctx.lineTo(this.width, this.heigth);
    this.ctx.lineTo(0, this.heigth);

    this.ctx.fill();
    this.ctx.closePath();

    this.angle += 5;
    this.liquidDisplacement -= 1;

    if (this.liquidDisplacement === 0) {
      this.liquidDisplacement = this.heigth;
      const temp = this.backgroundColor;
      this.backgroundColor = this.liquidColor;
      this.liquidColor = temp;
    }
  }

  drawDrops() {
    this.ctx.clearRect(0, 0, this.width, this.heigth);

    this.ctx.fillStyle = this.backgroundColor;

    this.ctx.fillRect(0, 0, this.width, this.heigth);

    for (const drop of this.drops) {
      drop.draw(this.ctx, this.liquidColor);
    }

    this.liquidFilling();

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
