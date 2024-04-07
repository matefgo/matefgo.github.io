import "./style.css";

type Line = {
  x: number;
  y: number;
  size: number;
  blur: number;
  radians: number;
  displacement: number;
  isOutOfScreen(line: Line): boolean;
};

enum Quadrant {
  First = 0,
  Second,
  Third,
  Fourth,
}

let unblurredLines = 0;
const canvas = document.querySelector("canvas");
const lines: Line[] = Array.from({ length: 10 }, generateLine);

function getAngleData(radians: number) {
  const sin = Math.sin(radians);
  const cos = Math.cos(radians);
  const quadrant = Math.floor(radians / (Math.PI / 2)) as Quadrant;

  return { sin, cos, quadrant };
}

function defineEntryPoint(
  radians: number
): Pick<Line, "x" | "y" | "isOutOfScreen"> {
  const slope = Math.tan(radians);
  const { sin, cos, quadrant } = getAngleData(radians);

  const randomX = Math.floor(((Math.random() * 10) / 10) * window.innerWidth);
  const randomY = Math.floor(((Math.random() * 10) / 10) * window.innerHeight);

  const yIntercept = Math.floor(randomY - slope * randomX);
  const xIntercept = Math.floor(-yIntercept / slope);

  const widthY = Math.floor(slope * window.innerWidth + yIntercept);
  const heightX = Math.floor((window.innerHeight - yIntercept) / slope);

  const xByQuadrant = {
    [Quadrant.First]: xIntercept,
    [Quadrant.Second]: window.innerWidth,
    [Quadrant.Third]: heightX,
    [Quadrant.Fourth]: 0,
  };

  const yByQuadrant = {
    [Quadrant.First]: 0,
    [Quadrant.Second]: widthY,
    [Quadrant.Third]: window.innerHeight,
    [Quadrant.Fourth]: yIntercept,
  };

  const quandrantOutOfScreen = {
    [Quadrant.First]: (line: Line) => {
      const currentSize = line.displacement - line.size;
      const sizeYProjection = cos * currentSize;
      const sizeXProjection = sin * currentSize;

      if (radians > Math.PI / 4) {
        return sizeYProjection > window.innerHeight;
      }

      return sizeXProjection + xIntercept > window.innerWidth;
    },
    [Quadrant.Second]: (line: Line) => {
      const currentSize = line.displacement - line.size;
      const sizeYProjection = Math.abs(cos) * currentSize;
      const sizeXProjection = sin * currentSize;

      if (radians > (3 * Math.PI) / 4) {
        return sizeXProjection > window.innerWidth;
      }

      return sizeYProjection + widthY > window.innerHeight;
    },
    [Quadrant.Third]: (line: Line) => {
      const currentSize = line.displacement - line.size;
      const sizeXProjection = Math.abs(cos) * currentSize;
      const sizeYProjection = Math.abs(sin) * currentSize;

      if (radians > (5 * Math.PI) / 4) {
        return sizeYProjection > window.innerHeight;
      }

      return sizeXProjection > heightX;
    },
    [Quadrant.Fourth]: (line: Line) => {
      const currentSize = line.displacement - line.size;
      const sizeXProjection = cos * currentSize;
      const sizeYProjection = Math.abs(sin) * currentSize;

      if (radians > (7 * Math.PI) / 4) {
        return sizeXProjection > window.innerWidth;
      }

      return sizeYProjection > yIntercept;
    },
  };

  return {
    x: xByQuadrant[quadrant],
    y: yByQuadrant[quadrant],
    isOutOfScreen: quandrantOutOfScreen[quadrant],
  };
}

function generateLine(): Line {
  const degree = Math.floor(Math.random() * 360);
  const size = Math.floor(Math.random() * 3000 + 1000);

  const radians = degree * (Math.PI / 180);

  const entrypoint = defineEntryPoint(radians);

  let blur = 0;

  if (unblurredLines === 5) {
    blur = Math.floor(Math.random() * 5) + 3;
  } else {
    unblurredLines += 1;
  }

  return {
    size,
    blur,
    radians,
    displacement: 0,
    ...entrypoint,
  };
}

function drawLine(line: Line, index: number) {
  const ctx = canvas?.getContext("2d");

  if (!ctx) {
    return;
  }

  const { x, y, radians, size, displacement, isOutOfScreen, blur } = line;

  ctx.translate(x, y);
  ctx.rotate(radians);

  const deltaX = displacement - size;
  const gradient = ctx.createLinearGradient(deltaX, 0, displacement, 0);

  gradient.addColorStop(0, "transparent");
  gradient.addColorStop(0.5, "black");
  gradient.addColorStop(1, "transparent");

  ctx.lineCap = "round";
  ctx.strokeStyle = gradient;
  ctx.filter = `blur(${blur}px)`;

  ctx.beginPath();
  ctx.moveTo(deltaX, 0);
  ctx.lineTo(displacement, 0);
  ctx.stroke();
  ctx.closePath();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  line.displacement += 15;

  if (isOutOfScreen(line)) {
    if (blur === 0) {
      unblurredLines -= 1;
    }

    lines[index] = generateLine();
  }
}

function main() {
  if (!canvas) {
    return;
  }

  const scale = window.devicePixelRatio;
  canvas.width = Math.floor(window.innerWidth * scale);
  canvas.height = Math.floor(window.innerHeight * scale);

  lines.map(drawLine);

  requestAnimationFrame(main);
}

requestAnimationFrame(main);
