import { Vector } from '../types';

export interface Ball {
  width: number;
  height: number;
  position: Vector;
  speed: Vector;
  image: HTMLImageElement;
}

interface BallParams {
  size: number;
  speed: number;
  position: Vector;
  image: string;
}

export const changeYDirection = (ball: Ball) => {
  ball.speed.y = -ball.speed.y;
}

export const changeXDirection = (ball: Ball) => {
  ball.speed.x = -ball.speed.x;
}

export const moveBall = (ball: Ball) => {
  ball.position.x += ball.speed.x;
  ball.position.y += ball.speed.y;
}

export default (params: BallParams): Ball => {
  const ballImage = new Image();
  ballImage.src = params.image;

  const ballSpeed = {
    x: params.speed,
    y: -params.speed,
  }

  return {
    width: params.size,
    height: params.size,
    position: params.position,
    speed: ballSpeed,
    image: ballImage,
  }
}
