import { Canvas } from "../common/classes/canvas";
import "./style.css";

export class Contact extends Canvas {
  currentAnimationId = 0;

  constructor() {
    super(".contact canvas");
  }

  animateCanvas() {}

  stopAnimation() {
    cancelAnimationFrame(this.currentAnimationId);
  }
}
