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

  @ViewChild('modalWindowIfPaymentsListEmpty') modalWindowIfPaymentsListEmpty: any;


  constructor(private paymentService: PaymentService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getPayments();
    this.paymentsArrayEmptyThanOpenModal();
    this.transformPayments();
    this.uniqueYears = this.paymentService.findUniqueYearsInPayments ();
  }
  // Show modal window if there is no payments in DB
  paymentsArrayEmptyThanOpenModal(): void {
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      if (this.payments.length === 0) {
        this.openModal(this.modalWindowIfPaymentsListEmpty);
      }
    });
  }
  // Get payment information for correct display on history page
  transformPayments() {
    // Update unique Months array
    this.uniqueMonths = this.paymentService.findUniqueMonths(this.selectedYear);
    // Parse payments array to transform in historyDisplay array
    this.paymentService.getPaymentsForSelectedYear(this.selectedYear).subscribe(data => {this.paymentsByYear = data;
      let n = 0;
      this.historyDisplay = [];
      for (const key of this.uniqueMonths) {
        this.historyDisplay.push({ month: key, payments: []});
        for (const i of this.paymentsByYear) {
          if ( key === i.month) {
            this.historyDisplay[n].payments.push({utilityName: i.utilityName, amountPayment: i.amountPayment});
          }
        }
         n++;
      }
      // Find total of every month in selectedYear
      this.totalByMonth = this.paymentService.totalOfEachMonth();
    });
  }

  // get all Payments
  getPayments(): void {
    this.paymentService.getPayments().subscribe(data => this.payments = data);
  }

  // Open modal window
  openModal(template: TemplateRef <any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }





}
