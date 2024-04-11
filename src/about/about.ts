import { Canvas } from "../common/classes/canvas";
import "./style.css";

type Square = {
  x: number;
  y: number;
  currentSize: number;
};

export class About extends Canvas {
  angle = 0;
  currentAnimationId = 0;
  mouseY = 0;
  mouseX = 0;
  radius = 300;
  size = 3;
  spacing = 3;
  colorAngle = 0;
  wavePosition = 0;
  rectangles: Square[] = [];

  constructor() {
    super(".about canvas");

    document.addEventListener("mousemove", (event) => {
      this.mouseX = event.clientX * devicePixelRatio;
      this.mouseY = event.clientY * devicePixelRatio;
    });

    this.defineSquareList();

    this.drawSquares();
  }

  // defineSquareSize() {

  // }

  defineSquareList() {
    const widthRatio = Math.floor(this.width / this.spacing);
    const heigthRatio = Math.floor(this.heigth / this.spacing);

    for (let j = 0; j < heigthRatio; j++) {
      const y = (2 * j - 1) * this.spacing;

      for (let i = 0; i < widthRatio; i++) {
        const x = (2 * i - 1) * this.spacing;

        this.rectangles.push({ x, y, currentSize: this.size });
      }
    }
  }

  drawSquares() {
    this.ctx.clearRect(0, 0, this.width, this.heigth);

    this.ctx.fillStyle = `hsl(${this.colorAngle}, 30%, 18%)`;

    this.ctx.fillRect(0, 0, this.width, this.heigth);

    this.ctx.fillStyle = "white";
    this.ctx.globalCompositeOperation = "overlay";

    if (this.rectangles.length > 0) {
      this.ctx.beginPath();

      for (const rect of this.rectangles) {
        const xCoordinate = Math.abs(this.mouseX - (rect.x + this.size / 2));
        const yCoordinate = Math.abs(this.mouseY - (rect.y + this.size / 2));

        const distance = Math.sqrt(xCoordinate ** 2 + yCoordinate ** 2);

        let currentSize =
          this.size * Math.min(Math.sqrt(distance / this.radius), 1);
        this.ctx.rect(rect.x, rect.y, currentSize, currentSize);
      }

      this.ctx.fill();
    }

    this.colorAngle += 0.1;

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
