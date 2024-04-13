import { Canvas } from "../common/classes/canvas";
import "./style.css";

type Rect = {
  x: number;
  y: number;
};

export class About extends Canvas {
  currentAnimationId = 0;

  mouseX = this.width / 2;
  mouseY = this.heigth / 2;

  realMouseX = this.width / 2;
  realMouseY = this.heigth / 2;

  sphereDisplacementFactor = 0;

  size = 3;
  spacing = 12;
  distortionRadius = 300;
  dynamicAngle = Math.random() * 360;

  rectangles: Rect[] = [];

  constructor() {
    super(".about canvas");

    document.addEventListener("mousemove", (event) => {
      this.realMouseX = event.clientX * devicePixelRatio;
      this.realMouseY = event.clientY * devicePixelRatio;

      this.sphereDisplacementFactor = 0;
    });

    this.defineSquareList();

    this.drawSquares();
  }

  defineSquareList() {
    const widthRatio = Math.floor(this.width / this.spacing);
    const heigthRatio = Math.floor(this.heigth / this.spacing);

    for (let j = 0; j < heigthRatio; j++) {
      const y = (2 * j - 1) * this.spacing;

      for (let i = 0; i < widthRatio; i++) {
        const x = (2 * i - 1) * this.spacing;

        this.rectangles.push({ x, y });
      }
    }
  }

  defineRectPath(rect: Rect) {
    const displacement = this.size / 2;

    let finalX = rect.x + displacement;
    let finalY = rect.y + displacement;

    const dX = this.mouseX - finalX;
    const dY = this.mouseY - finalY;

    const distance = Math.hypot(dX, dY);

    const currentRadius = this.distortionRadius * 1.66;

    if (distance < this.distortionRadius) {
      const ratio = distance ** 2 / currentRadius;

      finalY += ratio - currentRadius + this.distortionRadius;

      const waveDistortion = this.waveDistortion(
        this.distortionRadius,
        currentRadius
      );

      this.ctx.rect(finalX, finalY - waveDistortion, this.size, this.size);

      return;
    }

    const waveDistortion = this.waveDistortion(distance, currentRadius);

    this.ctx.rect(finalX, finalY - waveDistortion, this.size, this.size);
  }

  waveDistortion(distance: number, radius: number) {
    const ratio = (2 * distance) / radius;

    const angularFactor = Math.cos(2 * Math.PI * ratio + this.dynamicAngle);

    return 100 * Math.exp(-ratio) * angularFactor;
  }

  circleOverlay() {
    this.ctx.beginPath();

    const gradient = this.ctx.createRadialGradient(
      this.mouseX,
      this.mouseY,
      this.distortionRadius,
      this.mouseX,
      this.mouseY + 300,
      this.distortionRadius
    );
    gradient.addColorStop(0, "rgba(255,255, 255, 0.15)");
    gradient.addColorStop(1, "rgba(255,255, 255, 0)");

    this.ctx.fillStyle = gradient;
    this.ctx.filter = "blur(30px)";

    this.ctx.arc(
      this.mouseX,
      this.mouseY - 25,
      this.distortionRadius,
      0,
      2 * Math.PI
    );

    this.ctx.fill();
    this.ctx.closePath();
  }

  handleBackground() {
    this.ctx.clearRect(0, 0, this.width, this.heigth);

    const gradient = this.ctx.createRadialGradient(
      this.mouseX,
      this.mouseY,
      0,
      this.mouseX,
      this.mouseY,
      Math.max((4 * this.width) / 7, (4 * this.heigth) / 7)
    );

    gradient.addColorStop(0, `hsl(${this.dynamicAngle}, 65%, 30%)`);
    gradient.addColorStop(1, `hsl(${this.dynamicAngle}, 65%, 5%)`);

    this.ctx.fillStyle = gradient;

    this.ctx.fillRect(0, 0, this.width, this.heigth);

    this.circleOverlay();

    this.dynamicAngle += 0.01;

    if (this.dynamicAngle >= 360) {
      this.dynamicAngle = 0;
    }

    document.documentElement.style.setProperty(
      "--color-angle",
      `${this.dynamicAngle}`
    );
  }

  handleMouseMove() {
    const dX = this.realMouseX - this.mouseX;
    const dY = this.realMouseY - this.mouseY;

    if (this.sphereDisplacementFactor === 170) {
      this.mouseX = this.realMouseX;
      this.mouseY = this.realMouseY;
      return;
    }

    const factor = this.sphereDisplacementFactor / 100;

    const ratio = 1 / (1 + Math.exp(5 - 2 * factor));

    this.mouseX += ratio * dX;
    this.mouseY += ratio * dY;

    this.sphereDisplacementFactor += 1;
  }

  drawSquares() {
    this.ctx.save();

    this.handleBackground();

    this.ctx.restore();

    this.ctx.fillStyle = "white";
    this.ctx.globalCompositeOperation = "overlay";

    this.ctx.beginPath();

    for (const rect of this.rectangles) {
      this.defineRectPath(rect);
    }

    this.ctx.fill();

    this.ctx.closePath();

    this.handleMouseMove();

    this.animateCanvas();
  }

  animateCanvas() {
    this.currentAnimationId = requestAnimationFrame(() => {
      this.drawSquares();
    });
  }

  stopAnimation() {
    cancelAnimationFrame(this.currentAnimationId);
  }
}
