export abstract class Canvas {
  protected width = 0;
  protected heigth = 0;
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  abstract currentAnimationId: number;

  constructor(canvasSelector: string) {
    this.canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.setCanvasSize();

    window.onresize = () => {
      this.setCanvasSize();
    };
  }

  abstract animateCanvas(): void;

  abstract stopAnimation(): void;

  private setCanvasSize() {
    this.ctx.scale(devicePixelRatio, devicePixelRatio);

    this.width = this.canvas.width = innerWidth * devicePixelRatio;
    this.heigth = this.canvas.height = innerHeight * devicePixelRatio;
  }
}
