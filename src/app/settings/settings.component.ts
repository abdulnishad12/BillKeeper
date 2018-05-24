import { Component, OnInit,TemplateRef } from '@angular/core';

import {PaymentService} from '../payment.service';
import {TariffsService} from '../tariffs.service';

import {Payment, Tariff} from '../payment';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormBuilder, Validators,FormArray,FormControl } from '@angular/forms';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  tariffs:Tariff[] = [];
  modalRef: BsModalRef;

  addNewUtility: FormGroup;
  addTariffVariable: FormGroup;




	  

  constructor(private paymentService: PaymentService, private tariffsService: TariffsService, private modalService: BsModalService,private fb: FormBuilder ) { }

  ngOnInit() { 
    this.getTariffs();
    this.initForm();
  }

  initForm(){

    this.addNewUtility = this.fb.group({
      utilityName: [null, [
      Validators.required,
      Validators.maxLength(15),
      Validators.pattern(/^[a-zA-Z\-]*$/)
      ]],
      fixedPrice: false,
    });
  }

  // Add new utility forms
  isControlInvalidNewUtility(controlName: string): boolean {
    const control = this.addNewUtility.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmitnewUtility() {
    const controls = this.addNewUtility.controls;
    /** Проверяем форму на валидность */ 
    if (this.addNewUtility.invalid) {
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
      /** Прерываем выполнение метода*/
      return;
    }
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;
      this.tariffsService.addTariff({ id:this.tariffs.length+1, utilityName:this.addNewUtility.value.utilityName, tariff:0, counterForPreviousMonth:0,fixedPayment: this.addNewUtility.value.fixedPrice } as Tariff)
      .subscribe(data => this.tariffs.push(data));
      this.addNewUtility.reset();
    });

  }

  onSubmitNewTariff(utilityName:string,fixedPayment:boolean,counterAnount:number,tariffAmount:number){
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;
      for (let key of this.tariffs){
        if (key.utilityName===utilityName){
          this.tariffsService.updateTariff({id:key.id, utilityName:key.utilityName, tariff: tariffAmount, counterForPreviousMonth:counterAnount,fixedPayment:key.fixedPayment}).subscribe();
        }
      }  
      this.getTariffs();
    }
  }











  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {  })
    );
  }


  
  //Get tariffs data
  getTariffs(): void {
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;
      console.log(this.tariffs);
    });
  }


    
  

}
