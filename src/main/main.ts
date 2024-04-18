import { AnimatedPage } from "../common/classes/animatedPage";
import { Canvas } from "../common/classes/canvas";
import "./style.css";

export enum Quadrant {
  First = 0,
  Second,
  Third,
  Fourth,
}

export class Line {
  x: number;
  y: number;
  lineFunction: ReturnType<typeof this.defineLineFunction>;

  size: number;
  displacement = 0;

  radians: number;
  quadrant: Quadrant;

  constructor() {
    this.radians = Math.random() * Math.PI * 2;
    this.quadrant = Math.floor(this.radians / (Math.PI / 2));

    this.size = Math.floor(Math.random() * 6000 + 3000);

    this.lineFunction = this.defineLineFunction();

    this.x = this.defineX();
    this.y = this.defineY();
  }

  isOutOfScreen() {
    const cos = Math.cos(this.radians);
    const sin = Math.sin(this.radians);

    const currentSize = this.displacement - this.size;

    const { xIntercept, widthY, yIntercept, heightX } = this.lineFunction;

    const quandrantOutOfScreen = {
      [Quadrant.First]: () => {
        const sizeYProjection = cos * currentSize;
        const sizeXProjection = sin * currentSize;

        if (this.radians > Math.PI / 4) {
          return sizeYProjection > innerHeight;
        }

        return sizeXProjection + xIntercept > innerWidth;
      },
      [Quadrant.Second]: () => {
        const sizeYProjection = Math.abs(cos) * currentSize;
        const sizeXProjection = sin * currentSize;

        if (this.radians > (3 * Math.PI) / 4) {
          return sizeXProjection > innerWidth;
        }

        return sizeYProjection + widthY > innerHeight;
      },
      [Quadrant.Third]: () => {
        const sizeXProjection = Math.abs(cos) * currentSize;
        const sizeYProjection = Math.abs(sin) * currentSize;

        if (this.radians > (5 * Math.PI) / 4) {
          return sizeYProjection > innerHeight;
        }

        return sizeXProjection > heightX;
      },
      [Quadrant.Fourth]: () => {
        const sizeXProjection = cos * currentSize;
        const sizeYProjection = Math.abs(sin) * currentSize;

        if (this.radians > (7 * Math.PI) / 4) {
          return sizeXProjection > innerWidth;
        }

        return sizeYProjection > yIntercept;
      },
    };

    return quandrantOutOfScreen[this.quadrant]();
  }

  draw(ctx: CanvasRenderingContext2D) {
    const deltaX = this.displacement - this.size;

    ctx.translate(this.x, this.y);
    ctx.rotate(this.radians);

    const gradient = ctx.createLinearGradient(deltaX, 0, this.displacement, 0);

    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(0.5, "black");
    gradient.addColorStop(1, "transparent");

    ctx.lineCap = "round";
    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(deltaX, 0);
    ctx.lineTo(this.displacement, 0);
    ctx.stroke();
    ctx.closePath();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    this.displacement += 15;
  }

  private defineLineFunction() {
    const slope = Math.tan(this.radians);

    const randomX = Math.floor(((Math.random() * 10) / 10) * innerWidth);
    const randomY = Math.floor(((Math.random() * 10) / 10) * innerHeight);

    const yIntercept = Math.floor(randomY - slope * randomX);
    const xIntercept = Math.floor(-yIntercept / slope);

    const widthY = Math.floor(slope * innerWidth + yIntercept);
    const heightX = Math.floor((innerHeight - yIntercept) / slope);

    return {
      widthY,
      heightX,
      xIntercept,
      yIntercept,
    };
  }

  private defineX() {
    const { xIntercept, heightX } = this.lineFunction;

    const xByQuadrant = {
      [Quadrant.First]: xIntercept,
      [Quadrant.Second]: innerWidth,
      [Quadrant.Third]: heightX,
      [Quadrant.Fourth]: 0,
    };

    return xByQuadrant[this.quadrant];
  }

  private defineY() {
    const { widthY, yIntercept } = this.lineFunction;

    const yByQuadrant = {
      [Quadrant.First]: 0,
      [Quadrant.Second]: widthY,
      [Quadrant.Third]: innerHeight,
      [Quadrant.Fourth]: yIntercept,
    };

    return yByQuadrant[this.quadrant];
  }
}

export class Main implements AnimatedPage {
  currentAnimationId = 0;

  noBlurCanvas: Canvas;
  fullBlurCanvas: Canvas;
  mediumBlurCanvas: Canvas;

  noBlurLines: Line[];
  fullBlurLines: Line[];
  mediumBlurLines: Line[];

  constructor() {
    this.noBlurLines = Array.from({ length: 4 }, () => new Line());
    this.fullBlurLines = Array.from({ length: 3 }, () => new Line());
    this.mediumBlurLines = Array.from({ length: 3 }, () => new Line());

    this.fullBlurCanvas = new Canvas("#full-blur");
    this.mediumBlurCanvas = new Canvas("#medium-blur");
    this.noBlurCanvas = new Canvas("#no-blur");

    this.drawScene();
  }

  drawLines(linesList: Line[], ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    linesList.map((line, index) => {
      line.draw(ctx);

      if (line.isOutOfScreen()) {
        linesList[index] = new Line();
      }
    });
  }

  drawScene() {
    this.drawLines(this.noBlurLines, this.noBlurCanvas.ctx);
    this.drawLines(this.fullBlurLines, this.fullBlurCanvas.ctx);
    this.drawLines(this.mediumBlurLines, this.mediumBlurCanvas.ctx);

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
