
export class Payment {
  id: number;
  utilityName: string;
  year: number;
  month: number;
  amountPayment: number;
}

export class PaymentsByMonths {
  month: number;
  payments: PaymentByMonth[];
}

export class PaymentByMonth {
  utilityName: string;
  amountPayment: number;
}







