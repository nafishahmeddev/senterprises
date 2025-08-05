declare interface Transaction {
  _id: string;
	uid: number;
	phone: string;
	transactionAmount: number;
	receiverAmount: number;
	status: "pending" | "success" | "failed" | "disputed" | "refunded";
	operator?: string;
	circle?: string;
	createdAt: Date;
	updatedAt: Date;
	externalTxnId?: string; // from actual recharge provider
	internalTxnId: string;
	idempotencyKey: string;

  createdAt: Date;
  updatedAt: Date;
}
