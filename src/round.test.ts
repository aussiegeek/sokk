import { round } from "./round";
import fc from "fast-check";

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

  test("property test", () => {
    fc.assert(
      fc.property(fc.nat(), fc.nat(), (numberToRound, step) => {
        const rounded = round(numberToRound, step);
        if (step === 0) {
          expect(rounded).toEqual(0);
        } else {
          expect(Math.abs(rounded) % step).toEqual(0);
        }
        const slightlyHigher = rounded + step * 0.1;

        expect(round(slightlyHigher, step)).toEqual(rounded);

        expect(round(rounded, step)).toEqual(rounded);
        expect(round(rounded + step * 0.1, step)).toEqual(rounded);
        expect(round(rounded + step * 0.2, step)).toEqual(rounded);
        expect(round(rounded + step * 0.3, step)).toEqual(rounded);
        expect(round(rounded + step * 0.4, step)).toEqual(rounded);

        expect(round(rounded + step * 0.5, step)).toEqual(rounded + step);
        expect(round(rounded + step * 0.6, step)).toEqual(rounded + step);
        expect(round(rounded + step * 0.7, step)).toEqual(rounded + step);
        expect(round(rounded + step * 0.8, step)).toEqual(rounded + step);
        expect(round(rounded + step * 0.9, step)).toEqual(rounded + step);
        expect(round(rounded + step, step)).toEqual(rounded + step);
      })
    );
  });
});
