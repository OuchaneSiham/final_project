import Paddle from "./Paddle.js";
const paddle = new Paddle(50, 250, 20, 100, 300);
console.log(paddle.getBounds());
paddle.moveUp(1 / 60);
console.log(paddle.getBounds());
paddle.moveDown(1 / 60);
console.log(paddle.getBounds());
