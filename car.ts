import { Controls } from './controls';

export class Car {
  private speed = 0;
  private acceleration = 0.2;
  private friction = 0.05;
  private controls: Controls;

  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    private maxSpeed: number,
    private controllable: boolean
  ) {
    this.controls = new Controls(controllable);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.update();
    this.draw(ctx);
  }

  private update() {
    if (this.controls.isMovingForward) {
      this.speed += this.acceleration;
    }
    if (this.controls.isMovingBackwards) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    this.y -= this.speed;
  }

  private draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();
  }
}
