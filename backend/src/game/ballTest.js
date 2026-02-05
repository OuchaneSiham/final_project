import Ball from "./Ball.js";
const ball = new Ball(400, 300, 300);
// setInterval(() => {
//     Math.random() > 0.5 ? ball.bounceX() : ball.bounceY();
//     ball.update(1/60); // Assuming 60 FPS, so deltaTime is 1/60
//     console.log(ball.getState());
// }, 1000 / 60); // Log the ball state every frame (60 times per second)
console.log(ball.getState());
ball.update(1 / 60);
console.log(ball.getState());
ball.bounceX();
ball.update(1 / 60);
console.log(ball.getState());
ball.bounceY();
ball.update(1 / 60);
console.log(ball.getState());
ball.reset();
console.log(ball.getState());
