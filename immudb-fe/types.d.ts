interface Account {
  _id: string;
  accountName: string;
  accountNumber: string;
  iban: string;
  amount: number;
  type: "sending" | "receiving";
}
