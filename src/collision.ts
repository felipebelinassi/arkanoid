import { Brick } from './sprites/brick';
import { Paddle } from './sprites/paddle';
import { Ball, changeXDirection, changeYDirection } from './sprites/ball';
import { CanvasView } from './view/canvas-view';

const isCollidingBrick = (ball: Ball, brick: Brick) => {
  if (
    ball.position.x < brick.position.x + brick.width &&
    ball.position.x + ball.width > brick.position.x &&
    ball.position.y < brick.position.y + brick.height &&
    ball.position.y + ball.height > brick.position.y
  ) {
    return true;
  }

  return false;
}

export const isCollidingBricks = (ball: Ball, bricks: Brick[]) => {
  let isColliding = false;

  bricks.forEach((brick, index) => {
    if (isCollidingBrick(ball, brick)) {
      changeYDirection(ball);

      if (brick.energy === 1) {
        bricks.splice(index, 1);
      }
      brick.energy -= 1;

      isColliding = true;
    }
  });

  return isColliding;
};

export const checkBallCollision = (ball: Ball, paddle: Paddle, view: CanvasView) => {
  if (
    ball.position.x + ball.width > paddle.position.x &&
    ball.position.x < paddle.position.x + paddle.width &&
    ball.position.y + ball.height === paddle.position.y
  ) {
    changeYDirection(ball);
  }

  if (ball.position.x > view.canvas.width - ball.width || ball.position.x < 0) {
    changeXDirection(ball);
  }

  if (ball.position.y < 0) {
    changeYDirection(ball);
  }
}