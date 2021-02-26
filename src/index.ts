import canvasView, { CanvasView } from './view/canvas-view';
import { Brick } from './sprites/brick';
import { Paddle } from './sprites/paddle';
import { Ball } from './sprites/ball';

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
  view.drawInfo('Game Over!');
}

const setGameWin = (view: CanvasView) => {
  view.drawInfo('Game Won!');
}

const gameLoop = (
  view: CanvasView,
  bricks: Brick[],
  // paddle: Paddle,
  // ball: Ball,
) => {
  console.log('loop');
  view.clear();
  view.drawBricks(bricks);

  requestAnimationFrame(() => gameLoop(view, bricks));
}

const startGame = (view: CanvasView) => {
  score = 0;
  view.drawInfo('');
  view.drawScore(0);

  const bricks = createBricks();

  gameLoop(view, bricks);
}

const view = canvasView('#playField');
view.initStartButton(startGame);
