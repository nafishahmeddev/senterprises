import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
dayjs.extend(RelativeTime);
dayjs.extend(utc);

export default class Formatter {
  static country(): string {
    return "US";
  }

  static currency(): string {
    return "EUR";
  }
  static money(amount: number, currency?: string) {
    const truncatedAmount = Math.trunc(amount * 100) / 100;

    const formatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency ?? Formatter.currency(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(truncatedAmount);
  }

  static moneyPlain(amount: number) {
    const formatter = new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(amount);
  }

  static datetime(datetime: string | Date): string {
    return datetime
      ? dayjs(datetime).utc().format("DD/MM/YYYY hh:mm:ss A")
      : "";
  }

  static time(datetime: string | Date): string {
    return datetime ? dayjs(datetime).utc().format("hh:mm:ss A") : "";
  }

  static date(datetime: string | Date): string {
    return datetime ? dayjs(datetime).utc().format("DD/MM/YYYY") : "";
  }

  static phone(number: string): string {
    try {
      return number.toString();
    } catch {
      return number;
    }
  }

  static fromNow(date: Date) {
    return dayjs(date).fromNow();
  }

  static parseEuro(value: string): number {
    const normalized = value.replace(/\./g, "").replace(",", ".");
    const num = parseFloat(normalized);
    if (isNaN(num)) {
      throw new Error(`Cannot parse euro value: "${value}"`);
    }
    return num;
  }
}
