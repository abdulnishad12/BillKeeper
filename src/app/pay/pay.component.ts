import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

import { Payment, Tariff } from '../payment';

import { PaymentService } from '../payment.service';
import { TariffsService } from '../tariffs.service';
import { ValidationService } from '../validation.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.sass']
})
export class PayComponent implements OnInit {

  @ViewChild('newUserModalHelper') newUserModalHelper: any;

  modalRef: BsModalRef;

  payments: Payment[];
  selectedUtility: string;
  paymentAmount: number;
  tariffs: Tariff[];
  totalCalculation = 0;

  // Validation variable
  validatorVariablePaymentAmount = false;
  validatorVariableCalculation = false;
  validatorFixedPaymentAmount = false;



  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();



  constructor(private paymentService: PaymentService, private tariffsService: TariffsService, private modalService: BsModalService, private validationService: ValidationService) { }

  ngOnInit() {
    this.getTariffs();
    this.getPayments();
    this.newUserModalHelperMethod();
  }


  newUserModalHelperMethod(){
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;
      if (this.tariffs.length === 0) {
        this.openModal(this.newUserModalHelper)
      }
    });
  }

  updatePayment(amountOfPayment: number, utility: string, selectedMonth: any) {
    selectedMonth = this.getMonthNumber(selectedMonth);
    let addPaymentAmounts = 0;
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      for ( const key of this.payments) {
        if (key.utilityName === utility && key.year === this.currentYear && key.month === selectedMonth) {
          addPaymentAmounts = key.amountPayment + amountOfPayment;
          this.paymentService.updatePayment({id: key.id, utilityName: utility, year: this.currentYear, month: selectedMonth, amountPayment: addPaymentAmounts}).subscribe();
        }
      }
    });
  }

  addPayment(amountOfPayment: number, utility: string, selectedMonth: any){
    selectedMonth = this.getMonthNumber(selectedMonth);
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      this.paymentService.addPayment({ id: this.payments.length + 1, utilityName: utility, year: this.currentYear, month: selectedMonth, amountPayment: amountOfPayment } as Payment)
      .subscribe(data =>
        this.payments.push(data));
    });
  }

  getMonthNumber(selectedMonth: any) {
    let monthNumber = 0
    const months = [ ' ', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    for (const m of months) {
      if (m === selectedMonth) {
        selectedMonth = monthNumber;
      }
      monthNumber += 1;
    }
    return selectedMonth;
  }


   getPaymentInformation(amountOfPayment: number, utility: string, selectedMonth: any, confirmPayment: TemplateRef <any>, confirmUpdate: TemplateRef <any>) {
    this.paymentAmount = 0;
    selectedMonth = this.getMonthNumber(selectedMonth);
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      let n = 0;
      for ( const key of this.payments) {
        if (key.utilityName === utility && key.year === this.currentYear && key.month === selectedMonth) {
          this.openModal(confirmUpdate);
          this.paymentAmount = key.amountPayment;
        } else {
          n += 1;
          if (n === this.payments.length) {
            this.openModal(confirmPayment);
          }
        }
      }
    });
  }



  getCalculateInformation(counterForThisMonth: any , utility: string) {
    this.totalCalculation = 0;
    this.selectedUtility = utility;
    for (const key of this.tariffs) {
      if (utility === key.utilityName) {
        this.totalCalculation = (counterForThisMonth - key.counterForPreviousMonth) * key.tariff;
        this.tariffsService.updateTariff({id: key.id, utilityName: key.utilityName, tariff: key.tariff, counterForPreviousMonth: counterForThisMonth, fixedPayment: key.fixedPayment}).subscribe();
        key.counterForPreviousMonth = counterForThisMonth;
      }
    }
    this.formValidationVariablePayment(counterForThisMonth, utility);
    document.getElementById('VariblePriceButton').classList.remove('cursor-off');
  }


  // Http Methods

  getPayments() {
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
    });
  }

  getTariffs(): void {
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;
    });
  }

  // Open Modal Window

  openModal(template: TemplateRef <any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  // Show Alert

  showAlert(name: string) {
    document.getElementById(name).classList.remove('hide');
    setInterval(function() {
      document.getElementById(name).classList.add('hide');
    }, 3000);
  }

  // Form Validation Functions

  formValidationVariablePayment(amountOfPayment: any, utility: string) {
    this.selectedUtility = utility;
    this.validatorVariablePaymentAmount = this.validationService.formValidationLengthAndPositive(amountOfPayment);
  }

  formValidationFixedPayment(amountOfPaymentFixed: any, utility: string) {
    this.selectedUtility = utility;
    this.validatorFixedPaymentAmount = this.validationService.formValidationLengthAndPositive(amountOfPaymentFixed);
  }

  formValidationVariableCalculation(counterForThisMonth: string, utility: string) {
    this.selectedUtility = utility;
    this.validatorVariableCalculation = this.validationService.formValidationPreviousCounterLargerThanCurrent(counterForThisMonth,utility)
  }




}
















