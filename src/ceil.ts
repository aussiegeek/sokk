import { div } from "./div";

/**
 * Round value up to the next multiple of step
 * @param value - The value to be rounded
 * @param step - The multiple to round to - defaults to 1
 *
 * @example
 *
 * `round(32, 6) => 36`
 *
 * @example
 * `round(4, 3) => 6`
 *
 * @public
 */
export function ceil(value: number, step = 1): number {
  const [whole, remainder] = div(value, step);
  const numSteps = remainder > 0 ? whole + 1 : whole;
  return numSteps * step;
}
