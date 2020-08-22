export const MAX_VALUE = 2147483647;
import fc from "fast-check";

export const positiveInt: fc.Arbitrary<number> = fc.integer(1, MAX_VALUE);
export const natFloat: fc.Arbitrary<number> = fc
  .tuple(fc.nat(), fc.float())
  .map(([a, b]) => a);
export const steppedValue = fc
  .tuple(fc.nat(), positiveInt)
  .map(([multiplier, step]) => [multiplier * step, step])
  .filter(
    ([steppedValue, step]) => steppedValue < MAX_VALUE && step < MAX_VALUE
  );
