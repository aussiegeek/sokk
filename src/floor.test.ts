import { floor } from "./floor";
import fc from "fast-check";

describe("floor", () => {
  test("manual test", () => {
    expect(floor(1, 2)).toEqual(0);
  });
  test("property test", () => {
    fc.assert(
      fc.property(fc.nat(), fc.integer(1, 1000000), (value, step) => {
        const floored = floor(value, step);
        expect(floor(value, step)).toEqual(floored);

        expect(floored % step).toEqual(0);

        const slightlyHigher = floored + step * 0.1;
        expect(floor(slightlyHigher, step)).toEqual(floored);
      }),
      {
        verbose: true,
      }
    );
  });
});
