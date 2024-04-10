import { Canvas } from "../common/classes/canvas";
import "./style.css";

export class About extends Canvas {
  angle = 0;
  currentAnimationId = 0;

  constructor() {
    super(".about canvas");

    this.drawGradient();
  }

  drawGradient() {
    this.ctx.clearRect(0, 0, this.width, this.heigth);

    const gradient = this.ctx.createLinearGradient(
      0,
      0,
      this.width,
      this.heigth
    );

    gradient.addColorStop(0, `hsla(${this.angle}, 100%, 50%, 1)`);
    gradient.addColorStop(1, `hsla(${this.angle + 180}, 100%, 50%, 1)`);

    this.ctx.rect(0, 0, this.width, this.heigth);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    if (this.angle > 360) {
      this.angle = 0;
    } else {
      this.angle += 1;
    }

    this.animateCanvas();
  }

  animateCanvas() {
    this.currentAnimationId = requestAnimationFrame(() => {
      this.drawGradient();
    });
  }

  stopAnimation() {
    cancelAnimationFrame(this.currentAnimationId);
  }
}
