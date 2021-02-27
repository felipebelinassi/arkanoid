import { Vector } from '../types';

export interface Paddle {
  speed: number;
  width: number;
  height: number;
  position: Vector;
  image: HTMLImageElement;
  moveRight: boolean;
  moveLeft: boolean;
}

interface PaddleParams extends Omit<Paddle, 'image' | 'moveRight' | 'moveLeft'> {
  image: string;
}

export const movePaddle = (paddle: Paddle) => {
  if (paddle.moveLeft) paddle.position.x -= paddle.speed;
  if (paddle.moveRight) paddle.position.x += paddle.speed;
}

const handleKeyUp = (event: KeyboardEvent, paddle: Paddle) => {
  if (event.code === 'ArrowLeft' || event.key === 'ArrowLeft') paddle.moveLeft = false;
  if (event.code === 'ArrowRight' || event.key === 'ArrowRight') paddle.moveRight = false;
}

const handleKeyDown = (event: KeyboardEvent, paddle: Paddle) => {
  if (event.code === 'ArrowLeft' || event.key === 'ArrowLeft') paddle.moveLeft = true;
  if (event.code === 'ArrowRight' || event.key === 'ArrowRight') paddle.moveRight = true;
}

export default (params: PaddleParams): Paddle => {
  const paddleImage = new Image();
  paddleImage.src = params.image;

  const paddle = {
    speed: params.speed,
    width: params.width,
    height: params.height,
    position: params.position,
    moveRight: false,
    moveLeft: false,
    image: paddleImage,
  }

  document.addEventListener('keydown', (e: KeyboardEvent) => handleKeyDown(e, paddle));
  document.addEventListener('keyup', (e: KeyboardEvent) => handleKeyUp(e, paddle));

  return paddle;
}
