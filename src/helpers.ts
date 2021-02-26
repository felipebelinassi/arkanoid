import brick, { Brick } from './sprites/brick';
import {
  BRICK_IMAGES,
  LEVEL,
  STAGE_COLS,
  STAGE_PADDING,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_PADDING,
  BRICK_ENERGY
} from './setup';

export const createBricks = (): Brick[] => {
  return LEVEL.reduce((acc, element, i) => {
    const row = Math.floor((i + 1) / STAGE_COLS);
    const column = i % STAGE_COLS;

    const x = STAGE_PADDING + column * (BRICK_WIDTH + BRICK_PADDING);
    const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

    if (element === 0) return acc;

    const formattedBrick = brick({
      width: BRICK_WIDTH,
      height: BRICK_HEIGHT,
      position: { x, y },
      energy: BRICK_ENERGY[element],
      image: BRICK_IMAGES[element],
    })

    return [
      ...acc,
      formattedBrick,
    ]
  }, [] as Brick[]);
};
