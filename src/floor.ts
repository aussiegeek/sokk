import { div } from "./div";

/**
 * Round value down to the next multiple of step
 * @param value - The value to be rounded
 * @param step - The multiple to round to - defaults to 1
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
export function floor(value: number, step = 1): number {
  const [whole] = div(value, step);
  return whole * step;
}
