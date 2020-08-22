/**
 * @internal
 */
export function div(num: number, divisor: number): [number, number] {
  const quotient = Math.floor(num / divisor);
  const remainder = num % divisor;

  return [quotient, remainder];
}
