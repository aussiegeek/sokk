import { div } from "./div";

/**
 * @public
 */
export enum RoundDirection {
  Up = "up",
  Down = "down",
}

/**
 * @public
 */
export interface RoundOptions {
  roundDirection?: RoundDirection;
}

/**
 * Round value to nearest multiple of step
 * @param value - The value to be rounded
 * @param step - The multiple to round to - defaults to 1
 * @param options - modify rounding configuration
 *
 * @example
 *
 * `round(32, 6) => 30`
 *
 * @example
 * `round(4, 3) => 3`
 *
 * @public
 */
export function round(value: number, step = 1, options?: RoundOptions): number {
  if (step == 0 || value == 0) {
    return 0;
  }

  const [quotient, remainder] = div(value, step);

  const rounded =
    numSteps(quotient, remainder, step, options?.roundDirection) * step;
  return rounded;
}

function numSteps(
  quotient: number,
  remainder: number,
  step: number,
  roundDirection = RoundDirection.Up
): number {
  switch (roundDirection) {
    case RoundDirection.Up:
      return remainder * 2 >= step ? quotient + 1 : quotient;
    case RoundDirection.Down:
      return remainder * 2 > step ? quotient + 1 : quotient;
  }
  return 0;
}
