// Import stylesheets
import { Car } from './car';
import { Road } from './road';
import './style.scss';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = 200;
const ctx = canvas.getContext('2d');

const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, 3, true);

const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, 2, false)];

const animate = () => {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.getBorders(), []);
  }

  car.update(road.getBorders(), traffic);

  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.getY() + canvas.height * 0.7);

  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, 'red');
  }
  car.draw(ctx, 'blue');

  ctx.restore();
  requestAnimationFrame(animate);
};

animate();
