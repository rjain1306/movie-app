export class NumberHelper {
  static toPositiveNumber(num: number): any {
    return Math.abs(num);
  }

  static toNegativeNumber(num: number): any {
    return -Math.abs(num);
  }
}
