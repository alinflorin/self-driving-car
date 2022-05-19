import { Controls } from './controls';
import { Coords } from './coords';
import { Sensor } from './sensor';
import { polysIntersect } from './utils';

export class Car {
  private speed = 0;
  private acceleration = 0.2;
  private friction = 0.05;
  private angle = 0;
  private controls: Controls;
  private sensor: Sensor;
  private damaged = false;
  private polygon: Coords[] = [];

  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    private maxSpeed: number,
    controllable: boolean
  ) {
    if (controllable) {
      this.sensor = new Sensor(this);
    }
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

  getPolygon() {
    return this.polygon;
  }

  update(roadBorders: Coords[][], traffic: Car[]) {
    if (!this.damaged) {
      this.move();
      this.polygon = this.createPolygon();
      this.damaged = this.assessDamage(roadBorders, traffic);
    }
    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);
    }
  }

  private createPolygon() {
    const points: Coords[] = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    return points;
  }

  private assessDamage(roadBorders: Coords[][], traffic: Car[]) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    for (let i = 0; i < traffic.length; i++) {
      if (polysIntersect(this.polygon, traffic[i].getPolygon())) {
        return true;
      }
    }
    return false;
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

  draw(ctx: CanvasRenderingContext2D, color: string) {
    if (this.damaged) {
      ctx.fillStyle = 'gray';
    } else {
      ctx.fillStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();

    if (this.sensor) {
      this.sensor.draw(ctx);
    }
  }
}
