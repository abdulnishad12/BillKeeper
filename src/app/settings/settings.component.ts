import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { PaymentService } from '../payment.service';
import { UtilityService } from '../utility.service';
import { ValidationService } from '../validation.service';

import { Utility } from '../utility';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  modalRef: BsModalRef;

  utilities: Utility[] = [];
  selectedUtility: string;
  newUtilityFixedPriceCheckbox = false;

  // Validation variable
  validatorVariableCounter = false;
  validatorVariableTariff = false;
  validatorFixedTariff = false;
  validatorNewUtility = [false, ''];




  constructor(private paymentService: PaymentService,
              private utilityService: UtilityService,
              private modalService: BsModalService,
              private validationService: ValidationService) { }

  // For open modal from component by id in template
  @ViewChild('addNewUtilityModal') addNewUtilityModal: any;

  ngOnInit() {
    this.getUtilities();
    this.utilitiesArrayEmptyThanOpenModal();
  }

  // Open Help Window if there is no utilities in DB
  utilitiesArrayEmptyThanOpenModal() {
    this.utilityService.getUtilities().subscribe(data => {this.utilities = data;
      if (this.utilities.length === 0) {
        this.openModal(this.addNewUtilityModal);
      }
    });
  }


  // Add new utility
  onSubmitNewUtility(newUtilityName: string, fixedOrVariableCheckbox: boolean) {
      if (this.utilities.length !== 0) {
        this.utilityService.addUtility(
          { id: this.utilities.slice(-1)[0].id + 1,
            utilityName: newUtilityName,
            tariff: 0,
            previousCounter: 0,
            fixedPaymentIndicator: fixedOrVariableCheckbox } as Utility)
        .subscribe(data => this.utilities.push(data));
      } else {
        this.utilityService.addUtility(
          { id: 1, utilityName:
            newUtilityName, tariff: 0,
            previousCounter: 0,
            fixedPaymentIndicator: fixedOrVariableCheckbox } as Utility)
        .subscribe(data => this.utilities.push(data));
      }
    this.modalRef.hide();
  }

  // Add new tariff
  onSubmitNewTariff(utilityName: string, fixedPayment: boolean, counterAmount: number, tariffAmount: number) {
    for (const key of this.utilities) {
      if (key.utilityName === utilityName) {
        this.utilityService.updateTariff(
          {id: key.id,
          utilityName: key.utilityName,
          tariff: tariffAmount,
          previousCounter: counterAmount,
          fixedPaymentIndicator: key.fixedPaymentIndicator}).subscribe();
        key.previousCounter = counterAmount;
        key.tariff = tariffAmount;
      }
     }
  }

  // Http methods

  getUtilities(): void {
    this.utilityService.getUtilities().subscribe(data => {this.utilities = data;
    });
  }

  deleteUtility(utilityId: number) {
    this.utilityService.deleteUtility(utilityId).subscribe();
    this.getUtilities();
  }

  // Modal Window Activator

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  // Form Validation Functions

  formValidationVariableCounter(utilityName: string, counterAmount: string) {
    this.selectedUtility = utilityName;
    this.validatorVariableCounter = this.validationService.formValidationLengthAndPositive(counterAmount);
  }

  formValidationVariableTariff(utilityName: string, tariffAmount: string) {
    this.selectedUtility = utilityName;
    this.validatorVariableTariff = this.validationService.formValidationLengthAndPositive(tariffAmount);
  }

  formValidationFixed(utilityName: string, tariffAmount: string) {
    this.selectedUtility = utilityName;
    this.validatorFixedTariff = this.validationService.formValidationLengthAndPositive(tariffAmount);
  }

  formValidationNewUtility(newUtilityName: string) {
   this.validatorNewUtility = this.validationService.formValidationUniqueAndOnlyChars(newUtilityName, this.utilities);
  }



}

