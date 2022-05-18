// Import stylesheets
import { Car } from './car';
import { Road } from './road';
import './style.scss';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = 200;
const ctx = canvas.getContext('2d');

const road = new Road();
const car = new Car(100, 100, 30, 50, 3, true);

const animate = () => {
  canvas.height = window.innerHeight;
  road.render(ctx);
  car.render(ctx);
  requestAnimationFrame(animate);
};

animate();
