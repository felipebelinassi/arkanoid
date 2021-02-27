import { Vector } from '../types';

export interface Brick {
  width: number;
  height: number;
  position: Vector;
  energy: number;
  image: HTMLImageElement;
}

interface BrickParams extends Omit<Brick, 'image'> {
  image: string;
}

export default (params: BrickParams): Brick => {
  const brickImage = new Image();
  brickImage.src = params.image;

  return {
    width: params.width,
    height: params.height,
    position: params.position,
    energy: params.energy,
    image: brickImage,
  }
}
