import { Controls } from './controls';
import { Coords } from './coords';
import { Sensor } from './sensor';

export class Car {
  private speed = 0;
  private acceleration = 0.2;
  private friction = 0.05;
  private angle = 0;
  private controls: Controls;
  private sensor: Sensor;

  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    private maxSpeed: number,
    controllable: boolean
  ) {
    this.sensor = new Sensor(this);
    this.controls = new Controls(controllable);
  }

  getY() {
    return this.y;
  }

  getX() {
    return this.x;
  }

  getAngle() {
    return this.angle;
  }

  update(roadBorders: Coords[][]) {
    this.move();
    this.sensor.update(roadBorders);
  }

  private move() {
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

    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1;

      if (this.controls.isMovingLeft) {
        this.angle += flip * 0.05;
      }

      if (this.controls.isMovingRight) {
        this.angle -= flip * 0.05;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();

    ctx.restore();

    this.sensor.draw(ctx);
  }
}
