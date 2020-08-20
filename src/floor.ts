import { div } from "./div";

export function floor(value: number, step?: number): number {
  if (!step) {
    step = 1;
  }

  const [whole] = div(value, step);
  return whole * step;
}
