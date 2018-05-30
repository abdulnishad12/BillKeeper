import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';

import {PaymentService} from '../payment.service';
import { Payment, PaymentsByMonths } from '../payment';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  paymentsByYear: Payment[]; // Payments for selected year
  payments: Payment[];
  historyDisplay: PaymentsByMonths[]; // Array for display all payment on history page

  selectedYear = new Date().getFullYear();

  uniqueYears = [];
  uniqueMonths = [];
  totalByMonth = []; // total for each month

  modalRef: BsModalRef;

  @ViewChild('newUserModalHelper') newUserModalHelper: any;


  constructor(private paymentService: PaymentService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getPayments();
    this.newUserModalHelperMethod();
    this.getUniqueYears();
    this.getPaymentsInformation();
  }
  // Show modal window if there is no payments in DB
  newUserModalHelperMethod() {
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      if (this.payments.length === 0) {
        this.openModal(this.newUserModalHelper);
      }
    });
  }
  // Get payment information for correct display on history page
  getPaymentsInformation(): void {
    this.paymentService.getPaymentsByYear(this.selectedYear).subscribe(data => {this.paymentsByYear = data;
      // Get Unique Months from Payments for selected year
      this.getUniqueMonths();
      // Parse payments to make historyDisplay Array
      let n = 0;
      this.historyDisplay = [];
      for (const key of this.uniqueMonths) {
        this.historyDisplay.push({ month: key, payments: []});
        for (const i of this.paymentsByYear) {
          if ( key === i.month) {
            this.historyDisplay[n].payments.push({utilityName: i.utilityName, amountPayment: i.amountPayment});
          }
        }
         n += 1;
      }
      // Find total of every month for selected year
      this.totalOfEachMonth();
    });
  }

  // Get Unique years from payments
  // TODO
  getUniqueYears() {
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      for (const i of this.payments) {
        if (this.uniqueYears.indexOf(i.year) === -1) {
          this.uniqueYears.push(i.year);
        }
      }
      this.uniqueYears.sort(this.yearsOrder);
    });
    if (this.uniqueYears.length === 0 ) {
      this.uniqueYears.push(this.selectedYear);
    }
  }
  // Find unique Months from Payments for selected year
  getUniqueMonths() {
    this.uniqueMonths = [];
    for (const key of this.paymentsByYear) {
      if (this.uniqueMonths.indexOf(key.month) === -1) {
        this.uniqueMonths.push(key.month);
      }
    }
    this.uniqueMonths.sort(this.monthsOrder);
  }
  // Total for each month for selected Year
  totalOfEachMonth() {
    this.totalByMonth = [];
    let totalMonth = 0;
    for (const key of this.uniqueMonths) {
      for (const i of this.paymentsByYear) {
        if (key === i.month) {
          totalMonth += i.amountPayment;
        }
      }
      this.totalByMonth.push({month: key, totalOfMonth: totalMonth});
      totalMonth = 0;
    }
  }

  // get all Payments
  getPayments() {
    this.paymentService.getPayments().subscribe(data => this.payments = data);
  }

  // Open modal window
  openModal(template: TemplateRef <any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  // Sort years from biggest to littlest
  yearsOrder(a, b) {
    if (a > b) { return -1; }
    if (a < b) { return 1; }
  }
  // Sort months from 0 to 11
  monthsOrder(a, b) {
    if (a > b) { return 1; }
    if (a < b) { return -1; }
  }


}
