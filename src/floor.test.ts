import { floor } from "./floor";
import fc from "fast-check";
import { steppedValue, positiveInt, natFloat } from "./testHelpers";

describe("floor", () => {
  test("manual test", () => {
    expect(floor(1, 2)).toEqual(0);
    expect(floor(1, 1)).toEqual(1);
  });

  test("value which is a multiple of step should return the same value", () => {
    fc.assert(
      fc.property(steppedValue, ([steppedValue, step]) => {
        expect(floor(steppedValue, step)).toEqual(steppedValue);
      })
    );
  });

  test("any value returned should be a multiple of step", () => {
    fc.assert(
      fc.property(natFloat, positiveInt, (value, step) => {
        expect(floor(value, step) % step).toEqual(0);
      })
    );
  });

  test("always round to the lower step", () => {
    fc.assert(
      fc.property(
        steppedValue,
        fc.float(),
        ([steppedValue, step], stepFraction) => {
          const input = steppedValue + step * stepFraction;
          expect(floor(input, step)).toEqual(steppedValue);
        }
      )
    );
  });
});
