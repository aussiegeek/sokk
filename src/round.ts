import { div } from "./div";

/**
 * Round value to nearest multiple of step
 * @param value - The value to be rounded
 * @param step - The multiple to round to - defaults to 1
 *
 * @example
 *
 * `round(32, 6) => 30`
 *
 * @example
 * `round(4, 3) => 3`
 */

export function round(value: number, step?: number): number {
  if (step == 0 || value == 0) {
    return 0;
  }
  if (!step) {
    step = 1;
  }

  const [quotient, remainder] = div(value, step);

  const numSteps = remainder * 2 >= step ? quotient + 1 : quotient;
  const rounded = numSteps * step;
  return rounded;
}
