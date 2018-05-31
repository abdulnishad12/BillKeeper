import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const payments = [
      { id: 1, utilityName: 'Electricity', year: 2018, month: 5, amountPayment: 237, },
      { id: 2, utilityName: 'Gas', year: 2018, month: 3, amountPayment: 125,  },
      { id: 3, utilityName: 'Water', year: 2018, month: 2, amountPayment: 678, },
      { id: 4, utilityName: 'Trash', year: 2018, month: 1, amountPayment: 123, },
      { id: 5, utilityName: 'Trash', year: 2015, month: 5, amountPayment: 675, },
      { id: 6, utilityName: 'Trash', year: 2016, month: 5, amountPayment: 1250, },
      { id: 7, utilityName: 'Gas', year: 2017, month: 6, amountPayment: 1234, },
      { id: 8, utilityName: 'Gas', year: 2018, month: 11, amountPayment: 325, },
      { id: 9, utilityName: 'Water', year: 2016, month: 3, amountPayment: 421, },
      { id: 10, utilityName: 'Electricity', year: 2013, month: 7, amountPayment: 1131, },
      { id: 11, utilityName: 'Water', year: 2018, month: 5, amountPayment: 1244, },
      { id: 12, utilityName: 'Gas', year: 2018, month: 5, amountPayment: 424, },
    ];

    const utilities = [
      { id: 1, utilityName: 'Gas', tariff: 3.2, previousCounter: 50, fixedPaymentIndicator: false},
      { id: 2, utilityName: 'Electricity', tariff: 2.3, previousCounter: 25, fixedPaymentIndicator: false},
      { id: 3, utilityName: 'Water', tariff: 1.2, previousCounter: 32, fixedPaymentIndicator: false},
      { id: 4, utilityName: 'Trash', tariff: 300
        , previousCounter: 0, fixedPaymentIndicator: true},
    ];
  return {payments, utilities};
  }
}
