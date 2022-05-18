// Import stylesheets
import { Car } from './car';
import './style.scss';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = 200;
const ctx = canvas.getContext('2d');

const car = new Car(100, 100, 30, 50, 3, true);

const animate = () => {
  canvas.height = window.innerHeight;
  car.render(ctx);
  requestAnimationFrame(animate);
};

animate();
