import { ceil } from "./ceil";
import fc from "fast-check";

describe("ceil", () => {
  test("manual test", () => {
    expect(ceil(2, 3)).toEqual(3);
    expect(ceil(1, 2)).toEqual(2);
  });

  test("property test", () => {
    fc.assert(
      fc.property(fc.nat(), fc.integer(1, 1000000), (value, step) => {
        const ceiled = ceil(value, step);
        expect(ceil(value, step)).toEqual(ceiled);

        expect(ceiled % step).toEqual(0);

        const slightlyHigher = ceiled + step * 0.1;
        expect(ceil(slightlyHigher, step)).toEqual(ceiled + step);
      })
    );
  });
});
