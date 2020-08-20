import { div } from "./div";

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
