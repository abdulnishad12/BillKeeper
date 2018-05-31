import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const payments = [
      { id: 1, utilityName: 'Light', year: 2018, month: 5, amountPayment: 1350, },
      { id: 2, utilityName: 'Gas', year: 2018, month: 3, amountPayment: 1250,  },
      { id: 3, utilityName: 'Water', year: 2018, month: 2, amountPayment: 1252, },
      { id: 4, utilityName: 'Trash', year: 2018, month: 1, amountPayment: 1250 },
      { id: 5, utilityName: 'Trash', year: 2015, month: 5, amountPayment: 1350 },
      { id: 6, utilityName: 'Trash', year: 2016, month: 5, amountPayment: 1250 },
      { id: 7, utilityName: 'Gas', year: 2017, month: 6, amountPayment: 1250, },
      { id: 8, utilityName: 'Gas', year: 2018, month: 11, amountPayment: 1210, },
      { id: 9, utilityName: 'Water', year: 2016, month: 3, amountPayment: 1250, },
      { id: 10, utilityName: 'Light', year: 2013, month: 7, amountPayment: 1250, },
      { id: 11, utilityName: 'Water', year: 2018, month: 5, amountPayment: 1350, },
      { id: 12, utilityName: 'Gas', year: 2018, month: 5, amountPayment: 1350, },
    ];

    const utilities = [
      { id: 1, utilityName: 'Gas', tariff: 50, previousCounter: 50, fixedPaymentIndicator: false},
      { id: 2, utilityName: 'Light', tariff: 0, previousCounter: 0, fixedPaymentIndicator: false},
      { id: 3, utilityName: 'Water', tariff: 0, previousCounter: 0, fixedPaymentIndicator: false},
      { id: 4, utilityName: 'Trash', tariff: 0, previousCounter: 0, fixedPaymentIndicator: true},
      { id: 5, utilityName: 'Milk', tariff: 0, previousCounter: 0, fixedPaymentIndicator: true},
    ];
  return {payments, utilities};
  }
}
