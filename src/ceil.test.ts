import { ceil } from "./ceil";
import fc from "fast-check";
import { steppedValue, natFloat, positiveInt } from "./testHelpers";

describe("ceil", () => {
  test("manual test", () => {
    expect(ceil(2, 3)).toEqual(3);
    expect(ceil(1, 2)).toEqual(2);
  });

  test("value which is a multiple of step should return the same value", () => {
    fc.assert(
      fc.property(steppedValue, ([steppedValue, step]) => {
        expect(ceil(steppedValue, step)).toEqual(steppedValue);
      })
    );
  });

  test("any value returned should be a multiple of step", () => {
    fc.assert(
      fc.property(natFloat, positiveInt, (value, step) => {
        expect(ceil(value, step) % step).toEqual(0);
      })
    );
  });
  test("any value between steps should round up to the next step", () => {
    fc.assert(
      fc.property(
        steppedValue,
        fc.float(0.1, 1),
        ([steppedValue, step], stepFraction) => {
          const value = steppedValue + step * stepFraction;
          expect(ceil(value, step)).toEqual(steppedValue + step);
        }
      )
    );
  });
});
