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
    if (datetime === "0000-00-00" || datetime === "0000-00-00 00:00:00") {
      return "";
    }
    if (dayjs(datetime, "YYYY-MM-DD HH:mm:ss").isValid()) {
      return dayjs(datetime, "YYYY-MM-DD HH:mm:ss").utc().format("DD/MM/YYYY hh:mm:ss A");
    } else {
      return "";
    }
  }

  static time(datetime: string | Date): string {
    if (datetime === "0000-00-00" || datetime === "0000-00-00 00:00:00") {
      return "";
    }
    if (dayjs(datetime, "YYYY-MM-DD HH:mm:ss").isValid()) {
      return datetime ? dayjs(datetime, "YYYY-MM-DD HH:mm:ss").utc().format("hh:mm:ss A") : "";
    } else {
      return "";
    }
  }

  static date(datetime: string | Date): string {
    if (datetime === "0000-00-00" || datetime === "0000-00-00 00:00:00") {
      return "";
    }
    if (dayjs(datetime, "YYYY-MM-DD HH:mm:ss").isValid()) {
      return datetime ? dayjs(datetime, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY") : "";
    } else {
      return "";
    }
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
