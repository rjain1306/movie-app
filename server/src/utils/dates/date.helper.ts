/* eslint-disable newline-per-chained-call */
import * as moment from 'moment-fquarter';

export class DateHelper {
  public static toMonthFullName(month: number): string {
    return moment()
      .month(month - 1)
      .format('MMMM');
  }

  public static toMonthShortName(month: number): string {
    return moment()
      .month(month - 1)
      .format('MMM');
  }

  public static toMonthNumber(month: string): number {
    return new Date(`${month}-1-01`).getMonth() + 1;
  }

  public static getYearShortString(year: number): string {
    return `${year.toString().slice(-2)}`;
  }

  public static getCurrentYear(): number {
    return new Date().getFullYear();
  }

  public static getCurrentMonth(): number {
    return moment().format('MM');
  }

  public static getPrevYear(
    year: number,
    month: number,
    prevNumber: number = 1,
  ): number {
    return new Date(year, month, 0).getFullYear() - prevNumber;
  }
}
