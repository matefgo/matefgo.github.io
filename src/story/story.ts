import { Canvas } from "../common/classes/canvas";
import "./style.css";

type Rect = {
  index: number;
  speed: number;
  isCompleted: boolean;
  sideProgress: number[];
};

export class Story {
  yDisplacement = 0;
  currentAnimationId = 0;

  glowsCanvas: Canvas;
  pathsCanvas: Canvas;

  dX = 0;
  dY = 0;

  rects: Rect[];
  glows: any[] = [];

  constructor() {
    this.glowsCanvas = new Canvas("#glows");
    this.pathsCanvas = new Canvas("#paths");

    this.rects = this.buildRects();

    this.drawScene();
  }

  buildRects() {
    const angle = 130;
    const size = window.innerWidth / 3;

    const radians = (angle * Math.PI) / 180;

    this.dX = size * Math.sin(radians / 2);
    this.dY = size * Math.cos(radians / 2);

    return Array.from({ length: 10 }, (_, index) => {
      const rect = {
        index,
        isCompleted: false,
        sideProgress: [0, 0, 0, 0],
        speed: Math.floor(Math.random() * 7 + 3) / 10,
      };

      return rect;
    });
  }

  drawRectPath(rect: Rect) {
    const { index, sideProgress, speed } = rect;

    const x = innerWidth / 2;
    const y = 3 * this.dY * index;

    this.pathsCanvas.ctx.clearRect(
      0,
      0,
      this.pathsCanvas.width,
      this.pathsCanvas.heigth
    );

    if (sideProgress[0] < 100) {
      this.pathsCanvas.ctx.moveTo(x, y - this.dY);
      this.pathsCanvas.ctx.lineTo(
        x - (this.dX * sideProgress[0]) / 100,
        y - this.dY + (this.dY * sideProgress[0]) / 100
      );

      sideProgress[0] += speed;
    }

    if (sideProgress[0] >= 100 && sideProgress[1] < 100) {
      this.pathsCanvas.ctx.moveTo(x, y - this.dY);
      this.pathsCanvas.ctx.lineTo(x - this.dX, y);
      this.pathsCanvas.ctx.lineTo(
        x - this.dX + (this.dX * sideProgress[1]) / 100,
        y + (this.dY * sideProgress[1]) / 100
      );

      sideProgress[1] += speed;
    }

    if (sideProgress[1] >= 100 && sideProgress[2] < 100) {
      this.pathsCanvas.ctx.moveTo(x, y - this.dY);
      this.pathsCanvas.ctx.lineTo(x - this.dX, y);
      this.pathsCanvas.ctx.lineTo(x, y + this.dY);
      this.pathsCanvas.ctx.lineTo(
        x + (this.dX * sideProgress[2]) / 100,
        y + this.dY - (this.dY * sideProgress[2]) / 100
      );

      sideProgress[2] += speed;
    }

    if (sideProgress[2] >= 100 && sideProgress[3] < 100) {
      this.pathsCanvas.ctx.moveTo(x, y - this.dY);
      this.pathsCanvas.ctx.lineTo(x - this.dX, y);
      this.pathsCanvas.ctx.lineTo(x, y + this.dY);
      this.pathsCanvas.ctx.lineTo(x + this.dX, y);
      this.pathsCanvas.ctx.lineTo(
        x + this.dX - (this.dX * sideProgress[3]) / 100,
        y - (this.dY * sideProgress[3]) / 100
      );

      sideProgress[3] += speed;
    }

    if (sideProgress.every((progress) => progress >= 100)) {
      if (!rect.isCompleted) {
        rect.isCompleted = true;
      }

      const rectGlow = this.glows.find((glow) => glow.id === index);

      this.pathsCanvas.ctx.moveTo(x, y - this.dY);
      this.pathsCanvas.ctx.lineTo(x - this.dX, y);
      this.pathsCanvas.ctx.lineTo(x, y + this.dY);
      this.pathsCanvas.ctx.lineTo(x + this.dX, y);
      this.pathsCanvas.ctx.lineTo(x, y - this.dY);

      if (!rectGlow) {
        this.glows.push({
          id: index,
          y,
          size: 100,
          oscilator: 0,
        });
      }
    }
  }

  drawRects() {
    this.pathsCanvas.ctx.beginPath();

    if (this.rects.every((rect) => rect.isCompleted)) {
      this.yDisplacement += 1;

      if (this.yDisplacement > innerHeight) {
        this.yDisplacement = 0;
      }
    }

    for (let rect of this.rects) {
      this.drawRectPath(rect);
    }

    this.pathsCanvas.ctx.strokeStyle = "white";
    this.pathsCanvas.ctx.lineWidth = 2;
    this.pathsCanvas.ctx.stroke();
  }

  drawGlowPath(glow: any) {
    const { y } = glow;

    const x = innerWidth / 2;

    this.glowsCanvas.ctx.save();

    this.glowsCanvas.ctx.beginPath();

    this.glowsCanvas.ctx.moveTo(x, y - this.dY);
    this.glowsCanvas.ctx.lineTo(x - this.dX, y);
    this.glowsCanvas.ctx.lineTo(x, y + this.dY);
    this.glowsCanvas.ctx.lineTo(x + this.dX, y);
    this.glowsCanvas.ctx.lineTo(x, y - this.dY);

    this.glowsCanvas.ctx.closePath();

    this.glowsCanvas.ctx.strokeStyle = "#0059ff";
    this.glowsCanvas.ctx.lineWidth = glow.size / 5;

    if (glow.size > 50) {
      glow.size -= 1;
    } else {
      glow.size = 25 * Math.cos((glow.oscilator * Math.PI) / 180) + 25;

      glow.oscilator += 1;

      if (glow.oscilator === 360) {
        glow.oscilator = 0;
      }
    }

    this.glowsCanvas.ctx.stroke();

    this.glowsCanvas.ctx.restore();
  }

  drawGlows() {
    this.glowsCanvas.ctx.clearRect(
      0,
      0,
      this.glowsCanvas.width,
      this.glowsCanvas.heigth
    );

    for (let rect of this.glows) {
      this.drawGlowPath(rect);
    }
  }

  drawScene() {
    this.drawRects();

    this.drawGlows();

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
