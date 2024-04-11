import { Canvas } from "../common/classes/canvas";
import "./style.css";

export class Portfolio extends Canvas {
  currentAnimationId = 0;

  constructor() {
    super(".portfolio canvas");
  }

  animateCanvas() {}

  stopAnimation() {
    cancelAnimationFrame(this.currentAnimationId);
  }
}
