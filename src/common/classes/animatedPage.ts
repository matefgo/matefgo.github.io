export interface AnimatedPage {
  currentAnimationId: number;
  animateCanvas(): void;
  stopAnimation(): void;
}
