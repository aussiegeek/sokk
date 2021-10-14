/**
 * @internal
 */
export function div(num: number, divisor: number): [number, number] {
  let remainder = num % divisor;
  // Make sure remainder is not negative
  if (remainder < 0) remainder += divisor;
  const quotient = (num - remainder) / divisor;

  return [quotient, remainder];
}
