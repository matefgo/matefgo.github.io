export class Canvas {
  width = 0;
  heigth = 0;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvasSelector: string) {
    this.canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.setCanvasSize();
  }

  setCanvasSize() {
    this.width = this.canvas.width = innerWidth;
    this.heigth = this.canvas.height = innerHeight;
  }
}
