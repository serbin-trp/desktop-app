import Big from 'big.js';

export function sum(a: number | string, b: number | string): string {
  return new Big(a).plus(new Big(b)).toFixed(2);
}
