import { Brick } from '../sprites/brick';
import { Paddle } from '../sprites/paddle';
import { Ball } from '../sprites/ball';

export interface CanvasView {
  canvas: HTMLCanvasElement,
  clear: () => void;
  initStartButton: (startFunction: (view: CanvasView) => void) => void;
  drawScore: (score: number) => void;
  drawInfo: (text: string) => void;
  drawSprite: (sprite: Brick | Paddle | Ball) => void;
  drawBricks: (bricks: Brick[]) => void;
}

const canvasView = (canvasName: string): CanvasView => {
  const canvas = document.querySelector(canvasName) as HTMLCanvasElement;
  const context = canvas.getContext('2d');
  const scoreDisplay = document.querySelector('#score');
  const start = document.querySelector('#start');
  const info = document.querySelector('#info');

  const clear = () => {
    context?.clearRect(0, 0, canvas.width, canvas.height)
  };

  const initStartButton = (startFunction: (view: CanvasView) => void) => {
    start?.addEventListener('click', () => startFunction(canvasView(canvasName)));
  };

  const drawScore = (score: number) => {
    if (scoreDisplay) scoreDisplay.innerHTML = score.toString();
  };

  const drawInfo = (text: string) => {
    if (info) info.innerHTML = text;
  };

  const drawSprite = (sprite: Brick | Paddle | Ball) => {
    if (!sprite) return;

    context?.drawImage(
      sprite.image,
      sprite.position.x,
      sprite.position.y,
      sprite.width,
      sprite.height,
    )
  };

  const drawBricks = (bricks: Brick[]) => {
    bricks.forEach(brick => drawSprite(brick));
  };

  return {
    canvas,
    clear,
    initStartButton,
    drawScore,
    drawInfo,
    drawSprite,
    drawBricks,
  }
}

export default canvasView;
