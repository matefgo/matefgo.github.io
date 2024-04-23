import { Canvas } from "../common/classes/canvas";
import "./style.css";

class Rect {
  x: number;
  y: number;
  slope: number;
  yInterceptor: number;
  colorAngle = Math.floor(Math.random() * 360);
  colorSpeed = Math.floor(Math.random() * 9 + 1);
  isClockwise = Math.random() > 0.5 ? true : false;
  glowSize = 100;

  constructor(x: number, y: number, slope: number) {
    this.x = x;
    this.y = y;
    this.slope = slope;
    this.yInterceptor = y - slope * x;
  }

  getGradient(
    pathCtx: CanvasRenderingContext2D,
    glowCtx: CanvasRenderingContext2D,
    dX: number,
    dY: number
  ) {
    const conicGradient = pathCtx.createConicGradient(
      ((this.colorAngle * Math.PI) / 180) * (this.isClockwise ? 1 : -1),
      this.x,
      this.y
    );

    if (this.isClockwise) {
      conicGradient.addColorStop(0, "transparent");
      conicGradient.addColorStop(1, "white");
    } else {
      conicGradient.addColorStop(0, "white");
      conicGradient.addColorStop(1, "transparent");
    }

    this.colorAngle += this.colorSpeed / 10;

    if (Math.round(this.colorAngle) > 360) {
      this.drawGlow(this.colorAngle, glowCtx, dX, dY);
    }

    return conicGradient;
  }

  drawGlow(
    currentColorAngle: number,
    glowCtx: CanvasRenderingContext2D,
    dX: number,
    dY: number
  ) {
    glowCtx.beginPath();

    glowCtx.moveTo(this.x, this.y - dY);
    glowCtx.lineTo(this.x - dX, this.y);
    glowCtx.lineTo(this.x, this.y + dY);
    glowCtx.lineTo(this.x + dX, this.y);
    glowCtx.lineTo(this.x, this.y - dY);

    glowCtx.lineWidth = this.glowSize / 5;
    glowCtx.strokeStyle = "#003FFF";
    glowCtx.stroke();

    glowCtx.closePath();

    this.glowSize -= 1;

    if (this.glowSize === 0) {
      this.colorAngle = currentColorAngle % 360;
      this.glowSize = 100;
    }
  }
}

export class Story {
  currentAnimationId = 0;

  glowsCanvas: Canvas;
  pathsCanvas: Canvas;

  angle: number;
  size: number;
  initialProgress = 0;

  dX: number;
  dY: number;

  rects: Rect[];

  constructor() {
    this.glowsCanvas = new Canvas("#glows");
    this.pathsCanvas = new Canvas("#paths");

    this.angle = 130;
    this.size = Math.floor(this.pathsCanvas.width / 3);

    const radians = (this.angle * Math.PI) / 180;

    this.dX = this.size * Math.sin(radians / 2);
    this.dY = this.size * Math.cos(radians / 2);

    this.rects = this.buildRects();

    this.drawScene();
  }

  buildRects() {
    const finalX = this.pathsCanvas.width / 2;

    return Array.from({ length: 10 }, (_, index) => {
      const xSign = Math.random() > 0.5 ? 1 : -1;
      const tanSign = Math.random() > 0.5 ? 1 : -1;
      const tan = tanSign * Math.tan(Math.PI / 6);

      const finalY = ((index + 1) / 10) * this.pathsCanvas.heigth;
      const yInterceptor = finalY - tan * finalX;

      const widthFactor = xSign > 0 ? this.pathsCanvas.width : 0;

      const initialX = Math.floor(xSign * this.dX + widthFactor);
      const initialY = Math.floor(tan * initialX + yInterceptor);

      return new Rect(initialX, initialY, tan);
    });
  }

  drawRects(rect: Rect) {
    const { x, y } = rect;

    this.pathsCanvas.ctx.beginPath();

    this.pathsCanvas.ctx.moveTo(x, y - this.dY);
    this.pathsCanvas.ctx.lineTo(x - this.dX, y);
    this.pathsCanvas.ctx.lineTo(x, y + this.dY);
    this.pathsCanvas.ctx.lineTo(x + this.dX, y);
    this.pathsCanvas.ctx.lineTo(x, y - this.dY);

    const gradient = rect.getGradient(
      this.pathsCanvas.ctx,
      this.glowsCanvas.ctx,
      this.dX,
      this.dY
    );

    this.pathsCanvas.ctx.lineWidth = 2;
    this.pathsCanvas.ctx.strokeStyle = gradient;
    this.pathsCanvas.ctx.stroke();

    this.pathsCanvas.ctx.closePath();
  }

  drawScene() {
    this.pathsCanvas.ctx.clearRect(
      0,
      0,
      this.pathsCanvas.width,
      this.pathsCanvas.heigth
    );

    this.glowsCanvas.ctx.clearRect(
      0,
      0,
      this.glowsCanvas.width,
      this.glowsCanvas.heigth
    );

    this.rects.map((rect) => {
      this.drawRects(rect);
      const canvasWidth = this.pathsCanvas.width;

      if (Math.round(this.initialProgress) === 500) {
        return null;
      }

      const distance = canvasWidth / 2 - rect.x;

      rect.x += Math.floor((distance * this.initialProgress) / 500);
      rect.y = Math.floor(rect.yInterceptor + rect.slope * rect.x);

      this.initialProgress += 1;

      return null;
    });

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
