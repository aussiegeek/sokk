import { div } from "./div";
import fc from "fast-check";

describe("div", () => {
  test("5 / 2", () => {
    const [q, rem] = div(5, 2);
    expect(q).toEqual(2);
    expect(rem).toEqual(1);
  });

  test("4 / 2", () => {
    const [q, rem] = div(4, 2);
    expect(q).toEqual(2);
    expect(rem).toEqual(0);
  });

  test("6 / 4", () => {
    const [q, rem] = div(6, 4);
    expect(q).toEqual(1);
    expect(rem).toEqual(2);
  });
  test("property test", () => {
    fc.assert(
      fc.property(
        fc.integer(1, 1000000),
        fc.integer(1, 1000000),
        (number, divisor) => {
          const [q, rem] = div(number, divisor);

          expect(q).toEqual(Math.floor(number / divisor));

          if (q > 0) {
            expect(q * divisor + rem).toEqual(number);
          }
        }
      )
    );
  });
});
