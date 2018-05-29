import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';

import {PaymentService} from '../payment.service';
import { Payment, PaymentByMonth } from '../payment';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  paymentByYear: Payment[];
  payments: Payment[];
  selectedYear = new Date().getFullYear();
  years = [];
  months = [];
  historyDisplay: PaymentByMonth[] = [];
  totalByMonth = [];
  modalRef: BsModalRef;

  @ViewChild('newUserModalHelper') newUserModalHelper: any;


  constructor(private paymentService: PaymentService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getPaymentByYear();
    this.getPayment();
    this.newUserModalHelperMethod();
  }

  newUserModalHelperMethod(){
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      if (this.payments.length === 0) {
        this.openModal(this.newUserModalHelper)
      }
    });
  }

  yearsOrder(a, b) {
    if (a > b) { return -1; }
    if (a < b) { return 1; }
  }

  monthsOrder(a, b) {
    if (a > b) { return 1; }
    if (a < b) { return -1; }
  }

  getPaymentByYear(): void {
    this.paymentService.getPaymentsByYear(this.selectedYear).subscribe(data => {this.paymentByYear = data;
      // Find unique Months in DB for selected year
      this.months = [];
      for (const key of this.paymentByYear) {
        if (!this.months.length) {
          this.months.push(key.month);
        } else {
          if (this.months.indexOf(key.month) === -1) {
            this.months.push(key.month);
          }
        }
      }
      this.months.sort(this.monthsOrder);

      // Making parse DB to display on history page
      let u = 0;
      this.historyDisplay = [];
      for (const key of this.months) {
        this.historyDisplay.push({month: key, payments: []});
        for (const i of this.paymentByYear) {
          if ( key === i.month) {
            this.historyDisplay[u].payments.push({utilityName: i.utilityName, amountPayment: i.amountPayment});
          }
        }
        u += 1;
      }

      // Find total of every month
      this.totalByMonth = [];
      let totalMonth = 0;
      for (const key of this.months) {
        for (const i of this.paymentByYear) {
          if (key === i.month) {
            totalMonth += i.amountPayment;
          }
        }
        this.totalByMonth.push({month: key, totalOfMonth: totalMonth});
        totalMonth = 0;
      }
    });
  }

  getPayment(): void {
    // Find unique Years in DB
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      for (const i of this.payments) {
        if (!this.years.length) {
          this.years.push(i.year);
        } else {
          if (this.years.indexOf(i.year) === -1) {
            this.years.push(i.year);
          }
        }
      }
      this.years.sort(this.yearsOrder);
    });
    if (this.years.length === 0 ){
      this.years.push(this.selectedYear);
    }
  }

  openModal(template: TemplateRef <any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }




}
