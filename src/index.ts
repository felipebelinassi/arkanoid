import canvasView, { CanvasView } from './view/canvas-view';
import { Brick } from './sprites/brick';
import createPaddle, { movePaddle, Paddle } from './sprites/paddle';
import createBall, { Ball, moveBall } from './sprites/ball';
import * as collision from './collision';

import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';

import { 
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY,
} from './setup';

import { createBricks } from './helpers';

let gameOver = false;
let score = 0;

const setGameOver = (view: CanvasView) => {
  gameOver = false;
  view.drawInfo('Game Over!');
}

const setGameWin = (view: CanvasView) => {
  gameOver = false;
  view.drawInfo('Game Won!');
}

const gameLoop = (
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
) => {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);

  moveBall(ball);

  if (
    (paddle.moveLeft && paddle.position.x > 0) ||
    (paddle.moveRight && paddle.position.x < view.canvas.width - paddle.width)
  ) {
    movePaddle(paddle);
  }

  collision.checkBallCollision(ball, paddle, view);
  const isCollidingBrick = collision.isCollidingBricks(ball, bricks);

  if (isCollidingBrick) {
    score += 1;
    view.drawScore(score);
  }

  if (ball.position.y > view.canvas.height) {
    return setGameOver(view);
  }
  if (!bricks.length) {
    return setGameWin(view);
  }
  
  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball));
}

const startGame = (view: CanvasView) => {
  score = 0;
  view.drawInfo('');
  view.drawScore(0);

  const bricks = createBricks();
  const ball = createBall({
    speed: BALL_SPEED,
    size: BALL_SIZE,
    position: {
      x: BALL_STARTX,
      y: BALL_STARTY
    },
    image: BALL_IMAGE,
  });
  const paddle = createPaddle({
    speed: PADDLE_SPEED,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    position: {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5
    },
    image: PADDLE_IMAGE,
  })

  gameLoop(view, bricks, paddle, ball);
}

const view = canvasView('#playField');
view.initStartButton(startGame);
