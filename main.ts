import "./style.css";

const pi = Math.PI;
const canvas = document.querySelector("canvas");

const initialWidth = window.innerWidth;
const initialHeight = window.innerHeight;

function defineLines() {
  const lineCount = Math.floor(Math.random() * 30);

  const lines = Array.from({ length: lineCount }, () => {
    const degrees = Math.floor(Math.random() * 360);
    const angle = degrees * (pi / 180);

    const x0 = Math.random();
    const y0 = Math.floor(Math.random());

    return {
      x0,
      y0,
      angle,
      factor: 0.2,
    };
  });

  return lines;
}

const currentLines = defineLines();

function drawLines() {
  const ctx = canvas?.getContext("2d");

  if (!ctx || !canvas) {
    return;
  }

  ctx.clearRect(0, 0, initialWidth, initialHeight);

  currentLines.forEach((line) => {
    const { x0, y0, angle } = line;

    const initialX = x0 * initialWidth;
    const initialY = y0 * initialHeight;

    const x1 = initialWidth * Math.sin(angle) + initialX;
    const y1 = initialHeight * Math.cos(angle) + initialY;

    ctx.strokeStyle = "red";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(initialX, initialY);
    ctx.lineTo(x1, y1);
    ctx.stroke();

    return null;
  });

  window.requestAnimationFrame(drawLines);
}

window.addEventListener("resize", () => {
  if (!canvas) {
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

if (canvas) {
  canvas.width = initialWidth;
  canvas.height = initialHeight;
  canvas.style.aspectRatio = `auto`;
}

window.requestAnimationFrame(drawLines);
