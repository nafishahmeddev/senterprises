declare interface Account {
  _id: string;
  name: string;
  email: string;
  balance: number;
  dailyLimit: number;
  usedToday: number;
  apiKey: string;
  apiSecret: string;
  webhook?: string;
  createdAt: Date;
  updatedAt: Date;
}