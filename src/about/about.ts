import { Canvas } from "../common/classes/canvas";
import "./style.css";

type Square = {
  x: number;
  y: number;
};

export class About extends Canvas {
  currentAnimationId = 0;

  mouseX = Math.floor(this.width / 2);
  mouseY = Math.floor(this.heigth / 2);

  realMouseX = this.width / 2;
  realMouseY = this.heigth / 2;

  sphereDisplacementFactor = 0;

  size = 3;
  spacing = 12;
  distortionRadius = Math.max(this.width / 6, 200);
  dynamicAngle = Math.random() * 360;

  squares: Square[] = [];

  sphere: HTMLDivElement;

  constructor() {
    super(".about canvas");

    this.sphere = document.querySelector("#sphere") as HTMLDivElement;

    document.addEventListener("mousemove", (event) => {
      this.realMouseX = event.x;
      this.realMouseY = event.y;

      this.sphereDisplacementFactor = 0;
    });

    this.defineSquareList();

    this.drawScene();
  }

  defineSquareList() {
    const widthRatio = Math.floor(this.width / this.spacing);
    const heigthRatio = Math.floor(this.heigth / this.spacing);

    for (let j = 0; j < heigthRatio; j++) {
      const y = (2 * j - 1) * this.spacing;

      for (let i = 0; i < widthRatio; i++) {
        const x = (2 * i - 1) * this.spacing;

        this.squares.push({ x, y });
      }
    }
  }

  defineSquarePath(rect: Square) {
    let finalX = rect.x;
    let finalY = rect.y;

    const dX = this.mouseX - finalX;
    const dY = this.mouseY - finalY;

    const distance = Math.hypot(dX, dY);

    const currentRadius = this.distortionRadius * 1.66;

    if (distance < this.distortionRadius) {
      const ratio = distance ** 2 / currentRadius;

      finalY += Math.floor(ratio - currentRadius + this.distortionRadius);

      const waveDistortion = this.waveDistortion(this.distortionRadius);

      this.ctx.rect(finalX, finalY - waveDistortion, this.size, this.size);

      return;
    }

    const waveDistortion = this.waveDistortion(distance);

    this.ctx.rect(finalX, finalY - waveDistortion, this.size, this.size);
  }

  waveDistortion(distance: number) {
    const ratio = (2 * distance) / (this.distortionRadius * 1.66);

    const angularFactor = Math.cos(
      2 * Math.PI * ratio + this.dynamicAngle / 100
    );

    return Math.floor(100 * Math.exp(-ratio) * angularFactor);
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

    this.sphere.style.top =
      Math.floor(this.mouseY - this.distortionRadius) + "px";
    this.sphere.style.left =
      Math.floor(this.mouseX - this.distortionRadius) + "px";

    this.sphereDisplacementFactor += 1;
  }

  drawSquares() {
    this.ctx.clearRect(0, 0, this.width, this.heigth);

    this.ctx.fillStyle = "white";
    this.ctx.globalCompositeOperation = "overlay";

    this.ctx.beginPath();

    for (const rect of this.squares) {
      this.defineSquarePath(rect);
    }

    this.ctx.fill();
  }

  defineColorAngle() {
    this.dynamicAngle += 1;

    if (this.dynamicAngle >= 36000) {
      this.dynamicAngle = 0;
    }

    document.documentElement.style.setProperty(
      "--color-angle",
      `${Math.floor(this.dynamicAngle / 100)}`
    );
  }

  defineRadiusProperty() {
    document.documentElement.style.setProperty(
      "--diameter",
      `${Math.floor(2 * this.distortionRadius)}px`
    );
  }

  drawScene() {
    this.drawSquares();

    this.defineColorAngle();

    this.defineRadiusProperty();

    this.handleMouseMove();

    this.animateCanvas();
  }

  animateCanvas() {
    this.currentAnimationId = requestAnimationFrame(() => {
      this.drawScene();
    });
  }

  stopAnimation() {
    cancelAnimationFrame(this.currentAnimationId);
  }
}
