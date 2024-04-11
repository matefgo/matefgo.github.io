import { Canvas } from "../common/classes/canvas";
import "./style.css";

export class Story extends Canvas {
  angle = 0;
  currentAnimationId = 0;

  constructor() {
    super(".story canvas");
  }

  animateCanvas() {}

  stopAnimation() {
    cancelAnimationFrame(this.currentAnimationId);
  }
}
