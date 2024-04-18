import { AnimatedPage } from "../common/classes/animatedPage";
import { Canvas } from "../common/classes/canvas";
import "./style.css";

type Square = {
  x: number;
  y: number;
};

type SphereComponent = {
  color: string;
  finalAngle: number;
  initialAngle: number;
  waveDistortion: number;
  ctx: CanvasRenderingContext2D;
};

export class About implements AnimatedPage {
  currentAnimationId = 0;

  mouseX: number;
  mouseY: number;

  realMouseX: number;
  realMouseY: number;

  size = 3;
  spacing = 12;
  distortionRadius = 300;
  sphereDisplacementFactor = 0;
  dynamicAngle = Math.random() * 36000;

  squares: Square[] = [];

  sphereCanvas: Canvas;
  glowCanvas: Canvas;
  shadowCanvas: Canvas;
  squaresCanvas: Canvas;

  constructor() {
    this.sphereCanvas = new Canvas("#sphere");
    this.shadowCanvas = new Canvas("#shadow");
    this.glowCanvas = new Canvas("#glow");
    this.squaresCanvas = new Canvas("#squares");

    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;

    this.realMouseX = window.innerWidth / 2;
    this.realMouseY = window.innerHeight / 2;

    document.addEventListener("mousemove", (event) => {
      this.realMouseX = event.clientX;
      this.realMouseY = event.clientY;

      this.sphereDisplacementFactor = 0;
    });

    this.defineSquareList();

    this.drawScene();
  }

  defineSquareList() {
    const widthRatio = Math.floor(window.innerWidth / this.spacing);
    const heigthRatio = Math.floor(window.innerHeight / this.spacing);

    for (let j = 0; j < heigthRatio; j++) {
      const y = (2 * j - 1) * this.spacing;

      for (let i = 0; i < widthRatio; i++) {
        const x = (2 * i - 1) * this.spacing;

        this.squares.push({ x, y });
      }
    }
  }

  defineRectPath(rect: Square) {
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

      const waveDistortion = this.waveDistortion(this.distortionRadius);

      this.squaresCanvas.ctx.rect(
        finalX,
        finalY - waveDistortion,
        this.size,
        this.size
      );

      return;
    }

    const waveDistortion = this.waveDistortion(distance);

    this.squaresCanvas.ctx.rect(
      finalX,
      finalY - waveDistortion,
      this.size,
      this.size
    );
  }

  waveDistortion(distance: number) {
    const ratio = (2 * distance) / (this.distortionRadius * 1.66);

    const angularFactor = Math.cos(
      2 * Math.PI * ratio + this.dynamicAngle / 100
    );

    return 100 * Math.exp(-ratio) * angularFactor;
  }

  drawSphereComponent(params: SphereComponent) {
    const { ctx, color, waveDistortion, initialAngle, finalAngle } = params;
    ctx.clearRect(0, 0, this.squaresCanvas.width, this.squaresCanvas.heigth);

    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.arc(
      this.mouseX,
      this.mouseY - waveDistortion,
      this.distortionRadius,
      initialAngle,
      finalAngle
    );

    ctx.fill();
  }

  drawSphereItens() {
    const waveDistortion = this.waveDistortion(this.distortionRadius);

    this.drawSphereComponent({
      waveDistortion,
      initialAngle: 0,
      finalAngle: 2 * Math.PI,
      ctx: this.sphereCanvas.ctx,
      color: `hsl(${this.dynamicAngle / 100}, 100%, 60%)`,
    });

    this.drawSphereComponent({
      waveDistortion,
      ctx: this.glowCanvas.ctx,
      finalAngle: (325 * Math.PI) / 180,
      initialAngle: (215 * Math.PI) / 180,
      color: `hsl(${this.dynamicAngle / 100}, 100%, 100%)`,
    });

    this.drawSphereComponent({
      waveDistortion,
      ctx: this.shadowCanvas.ctx,
      initialAngle: (15 * Math.PI) / 180,
      finalAngle: (165 * Math.PI) / 180,
      color: `hsl(${this.dynamicAngle / 100}, 50%, 25%)`,
    });
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
    this.squaresCanvas.ctx.clearRect(
      0,
      0,
      this.squaresCanvas.width,
      this.squaresCanvas.heigth
    );

    this.squaresCanvas.ctx.fillStyle = "white";
    this.squaresCanvas.ctx.globalCompositeOperation = "overlay";

    this.squaresCanvas.ctx.beginPath();

    for (const rect of this.squares) {
      this.defineRectPath(rect);
    }

    this.squaresCanvas.ctx.fill();
  }

  drawScene() {
    this.drawSphereItens();

    this.drawSquares();

    this.handleMouseMove();

    this.dynamicAngle += 1;

    if (this.dynamicAngle >= 36000) {
      this.dynamicAngle = 0;
    }

    document.documentElement.style.setProperty(
      "--color-angle",
      `${Math.floor(this.dynamicAngle / 100)}`
    );

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
