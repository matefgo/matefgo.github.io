import "./style.css";
import { Canvas } from "./common/canvas";
import { Quadrant } from "./types/main";

class Line {
  x: number;
  y: number;
  lineFunction: ReturnType<typeof this.defineLineFunction>;

  blur: number;
  size: number;
  displacement = 0;

  radians: number;
  quadrant: Quadrant;

  constructor() {
    this.radians = Math.random() * Math.PI * 2;
    this.quadrant = Math.floor(this.radians / (Math.PI / 2));

    this.blur = Math.floor(Math.random() * 3) + 3;
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
    const opacity = this.blur ? 1 - this.blur / 10 : 1;

    ctx.translate(this.x, this.y);
    ctx.rotate(this.radians);

    const gradient = ctx.createLinearGradient(deltaX, 0, this.displacement, 0);

    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(0.5, "black");
    gradient.addColorStop(1, "transparent");

    ctx.lineCap = "round";
    ctx.strokeStyle = gradient;
    ctx.filter = `blur(${this.blur}px) opacity(${opacity})`;

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

class Main extends Canvas {
  lines: Line[];
  unblurredLines = 0;

  constructor() {
    super();

    this.lines = Array.from({ length: 10 }, () => this.generateLine());

    this.drawLines();
  }

  generateLine() {
    const line = new Line();

    if (this.unblurredLines < 3) {
      line.blur = 0;
      this.unblurredLines += 1;
    }

    return line;
  }

  drawLines() {
    this.ctx.clearRect(0, 0, this.width, this.heigth);

    this.lines.map((lineEntity, index) => {
      lineEntity.draw(this.ctx);

      if (lineEntity.isOutOfScreen()) {
        if (lineEntity.blur === 0) {
          this.unblurredLines -= 1;
        }
        this.lines[index] = this.generateLine();
      }
    });

    requestAnimationFrame(() => {
      this.drawLines();
    });
  }
}

window.onload = () => {
  new Main();
};
