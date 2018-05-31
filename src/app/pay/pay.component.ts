import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

import { Payment } from '../payment';
import { Utility } from '../utility';

import { PaymentService } from '../payment.service';
import { UtilityService } from '../utility.service';
import { ValidationService } from '../validation.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.sass']
})
export class PayComponent implements OnInit {

  // To have access to newUser Model from component
  @ViewChild('modalWindowIfUtilitiesListEmpty') modalWindowIfUtilitiesListEmpty: any;

  modalRef: BsModalRef;

  payments: Payment[];
  utilities: Utility[];

  selectedUtility: string; // to use validation or calculation only to chose utility from ngFor
  paymentAmount: number;
  totalCalculation = 0;

  // Validation variable
  validatorVariablePaymentAmount = false;
  validatorVariableCalculation = [ false , ''];
  validatorFixedPaymentAmount = false;

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();

  constructor(private paymentService: PaymentService,
              private utilityService: UtilityService,
              private modalService: BsModalService,
              private validationService: ValidationService) { }

  ngOnInit() {
    this.getUtilities();
    this.getPayments();
    this.utilitiesArrayEmptyThanOpenModal();
  }

  // Show modal window helper for hew user, if db of utilities empty
  utilitiesArrayEmptyThanOpenModal() {
    this.utilityService.getUtilities().subscribe(data => {this.utilities = data;
      if (this.utilities.length === 0) {
        this.openModal(this.modalWindowIfUtilitiesListEmpty);
      }
    });
  }
  // Update payment amount of chose date and utility
  updatePayment(amountOfPayment: number, utility: string, selectedMonth: any) {
    this.paymentService.updatePayment(amountOfPayment, utility, selectedMonth);
  }
  // Add payment of chose date and utility
  addPayment(amountOfPayment: number, utility: string, selectedMonth: any) {
    this.paymentService.addPayment(amountOfPayment, utility, selectedMonth);
  }

  // Decide which model should open, for update or add payment
  decideWhichConformationModalOpen(amountOfPayment: number,
                         utility: string,
                         selectedMonth: any,
                         confirmPayment: TemplateRef <any>,
                         confirmUpdate: TemplateRef <any>) {
    this.paymentAmount = 0; // for display payment amount in modal window, if it update modal
    selectedMonth = this.paymentService.transformNameOfMonthToNumber(selectedMonth);
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      for ( const key of this.payments) {
        if (key.utilityName === utility && key.year === this.currentYear && key.month === selectedMonth) {
          this.openModal(confirmUpdate);
          return this.paymentAmount = key.amountPayment;
        }
      }
      this.openModal(confirmPayment);
    });
  }


  // Calculate payment amount
  calculatePaymentAmount(currentCounter: any , utility: string) {
    this.totalCalculation = 0;
    this.selectedUtility = utility;
    for (const key of this.utilities) {
      if (utility === key.utilityName) {
        this.totalCalculation = (currentCounter - key.previousCounter) * key.tariff;
        // Update Previous Counter Amount = Current Counter Amount
        this.utilityService.updateTariff(
          {id: key.id,
            utilityName: key.utilityName,
            tariff: key.tariff,
            previousCounter: currentCounter,
            fixedPaymentIndicator: key.fixedPaymentIndicator}).subscribe();
        key.previousCounter = currentCounter;
      }
    }
  }


  // Http Methods

  getPayments() {
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
    });
  }

  getUtilities() {
    this.utilityService.getUtilities().subscribe(data => {this.utilities = data;
    });
  }

  // Open Modal Window

  openModal(template: TemplateRef <any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  // Form Validation Methods

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
    this.validatorVariableCalculation =
      this.validationService.formValidationForCalculation(
        counterForThisMonth,
        utility,
        this.utilities);
  }




}
















