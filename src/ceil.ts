import { div } from "./div";

export function ceil(value: number, step?: number): number {
  if (!step) {
    step = 1;
  }

  const [whole, remainder] = div(value, step);
  const numSteps = remainder > 0 ? whole + 1 : whole;
  return numSteps * step;
}
