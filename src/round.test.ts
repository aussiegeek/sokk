import { round, RoundDirection } from "./round";
import fc from "fast-check";
import { steppedValue, positiveInt, natFloat } from "./testHelpers";

describe("round", () => {
  it("returns the integer", () => {
    expect(round(1)).toBe(1);
  });

  it("rounds a float", () => {
    expect(round(1.1)).toBe(1);
  });

  it("rounds to nearest multiple of 2", () => {
    expect(round(2, 2)).toBe(2);
    expect(round(2.1, 2)).toBe(2);
    expect(round(2.9, 2)).toBe(2);
    expect(round(3.1, 2)).toBe(4);
    expect(round(5, 4)).toBe(4);
  });

  test("round positive integers correctly", () => {
    expect(round(0, 0)).toEqual(0);
    expect(round(0, 2)).toEqual(0);
    expect(round(1, 2)).toEqual(2);
    expect(round(2, 2)).toEqual(2);
    expect(round(3, 2)).toEqual(4);
    expect(round(4, 2)).toEqual(4);

    expect(round(1, 5)).toEqual(0);
    expect(round(2, 5)).toEqual(0);
    expect(round(3, 5)).toEqual(5);
    expect(round(4, 5)).toEqual(5);
    expect(round(5, 5)).toEqual(5);

    expect(round(10, 11)).toEqual(11);
    expect(round(11, 11)).toEqual(11);
    expect(round(12, 11)).toEqual(11);
  });

  test("round to nearest zero", () => {
    expect(round(1, 0)).toEqual(0);
    expect(round(2, 0)).toEqual(0);
  });

  test("round floats correctly", () => {
    expect(round(0.1, 5)).toEqual(0);
    expect(round(0.9, 5)).toEqual(0);
    expect(round(1.1, 5)).toEqual(0);
    expect(round(2.4, 5)).toEqual(0);
    expect(round(2.5, 5)).toEqual(5);
    expect(round(2.6, 5)).toEqual(5);
    expect(round(3.1, 5)).toEqual(5);
    expect(round(4.9, 5)).toEqual(5);
  });

  test("value which is a multiple of step should return the same value", () => {
    fc.assert(
      fc.property(steppedValue, ([steppedValue, step]) => {
        expect(round(steppedValue, step)).toEqual(steppedValue);
      })
    );
  });

  test("any value returned should be a multiple of step", () => {
    fc.assert(
      fc.property(natFloat, positiveInt, (value, step) => {
        expect(round(value, step) % step).toEqual(0);
      })
    );
  });

  test("rounding half way rounds up by default", () => {
    fc.assert(
      fc.property(steppedValue, ([steppedValue, step]) => {
        expect(round(steppedValue + step * 0.5, step)).toEqual(
          steppedValue + step
        );
      })
    );
  });

  test("rounding half way rounds up when configured", () => {
    fc.assert(
      fc.property(steppedValue, ([steppedValue, step]) => {
        expect(
          round(steppedValue + step * 0.5, step, {
            roundDirection: RoundDirection.Up,
          })
        ).toEqual(steppedValue + step);
      })
    );
  });

  test("rounding half way rounds down when configured", () => {
    fc.assert(
      fc.property(steppedValue, ([steppedValue, step]) => {
        expect(
          round(steppedValue + step * 0.5, step, {
            roundDirection: RoundDirection.Down,
          })
        ).toEqual(steppedValue);
      })
    );
  });

  test("less than half way to next step rounds down", () => {
    fc.assert(
      fc.property(
        steppedValue,
        fc.float(0, 0.5),
        ([steppedValue, step], stepFraction) => {
          const value = steppedValue + step * stepFraction;
          expect(round(value, step)).toEqual(steppedValue);
        }
      )
    );
  });

  test("more than half way to next step rounds up", () => {
    fc.assert(
      fc.property(
        steppedValue,
        fc.float(0.5, 1),
        ([steppedValue, step], stepFraction) => {
          const roundValue = steppedValue + step * stepFraction;
          expect(round(roundValue, step)).toEqual(steppedValue + step);
        }
      )
    );
  });
});
