import { Component, OnInit, TemplateRef } from '@angular/core';

import { PaymentService } from '../payment.service';
import { TariffsService } from '../tariffs.service';
import { ValidationService } from '../validation.service';

import { Tariff } from '../payment';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  tariffs: Tariff[] = [];
  selectedUtility: string;

  modalRef: BsModalRef;

  // Validation variable
  validatorVariableCounter = false;
  validatorVariableTariff = false;
  validatorFixedTariff = false;
  validatorNewUtility = false;




  constructor(private paymentService: PaymentService, private tariffsService: TariffsService, private modalService: BsModalService, private validationService: ValidationService) { }

  ngOnInit() {
    this.getTariffs();
  }


  // Add new utility

  onSubmitnewUtility(newUtilityName: string, fixedOrVariableCheakbox: boolean) {
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;this.tariffs[this.tariffs.length]
      this.tariffsService.addTariff({ id: this.tariffs.slice(-1)[0].id + 1, utilityName: newUtilityName, tariff: 0, counterForPreviousMonth: 0, fixedPayment: fixedOrVariableCheakbox } as Tariff)
      .subscribe(data => this.tariffs.push(data));
    });
    this.modalRef.hide();
    this.getTariffs();
  }

  // Add new tariff

  onSubmitNewTariff(utilityName: string, fixedPayment: boolean, counterAnount: number, tariffAmount: number) {
    for (const key of this.tariffs) {
      if (key.utilityName === utilityName) {
        this.tariffsService.updateTariff({id: key.id, utilityName: key.utilityName, tariff: tariffAmount, counterForPreviousMonth: counterAnount, fixedPayment: key.fixedPayment}).subscribe();
      }
     }
     this.getTariffs();
  }

  // Http methods

  getTariffs(): void {
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;
    });
  }

  deleteTariff(utilityId: number){
    this.tariffsService.deleteTariff(utilityId).subscribe();
    this.getTariffs();
  }

  // Show and hide Alert window

  showAlert(alertName: string) {
    document.getElementById(alertName).classList.remove('hide');
    setInterval(function() {
      document.getElementById(alertName).classList.add('hide');
    }, 3000);
  }

  // Modal Window Activator

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  // Form Validation Functions

  formValidationVariableCounter(utilityName: string, counterAnount: string) {
    this.selectedUtility = utilityName;
    this.validatorVariableCounter = this.validationService.formValidationLengthAndPositive(counterAnount);
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
   this.validatorNewUtility = this.validationService.formValidationNoReapeatAndOnlyNumbers(newUtilityName);
  }



}

