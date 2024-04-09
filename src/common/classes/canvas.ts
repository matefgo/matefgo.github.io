export class Canvas {
  width = 0;
  heigth = 0;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.querySelector("canvas")!;
    this.ctx = this.canvas?.getContext("2d")!;

    this.setCanvasSize();

    window.onresize = () => {
      this.setCanvasSize();
    };
  }

  setCanvasSize() {
    if (this.canvas) {
      this.width = this.canvas.width = innerWidth * devicePixelRatio;
      this.heigth = this.canvas.height = innerHeight * devicePixelRatio;

      this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }
  }

  animateCanvas(callback: FrameRequestCallback) {
    requestAnimationFrame(callback);
  }
}
