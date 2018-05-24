
export class Payment {
  id: number;
  utilityName: string;
  year:number;
  month:number;
  amountPayment:number;
}

export class PaymentByMonth{
	month:number;
	payments: Payments[];
}

export class Payments{
	utilityName:string;
	amountPayment:number;
}

export class Tariff{
	id: number;
	utilityName:string;
	tariff:number;
	counterForPreviousMonth:number;
	fixedPayment: boolean;
}





