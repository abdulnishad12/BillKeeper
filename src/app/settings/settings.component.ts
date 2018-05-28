import { Component, OnInit,TemplateRef } from '@angular/core';

import {PaymentService} from '../payment.service';
import {TariffsService} from '../tariffs.service';

import {Payment, Tariff} from '../payment';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  tariffs:Tariff[] = [];
  modalRef: BsModalRef;


  selectedUtility: string;

  newFixedPrice = false;

  //Validatoe variable
  validatorVariableCounter: boolean = false;
  validatorVariableTariff: boolean = false;
  validatorFixedTariff: boolean = false;
  validatorNewUtility: boolean = false;




	  

  constructor(private paymentService: PaymentService, private tariffsService: TariffsService, private modalService: BsModalService) { }

  ngOnInit() { 
    this.getTariffs();
  }



  onSubmitnewUtility(utility:string,cheakbox:boolean) {
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;this.tariffs[this.tariffs.length]
      this.tariffsService.addTariff({ id:this.tariffs.slice(-1)[0].id+1, utilityName:utility, tariff:0, counterForPreviousMonth:0,fixedPayment: cheakbox } as Tariff)
      .subscribe(data => this.tariffs.push(data));
    });  
    this.modalRef.hide();
    this.getTariffs();
    
  }

  // Add new tariff
  onSubmitNewTariff(utilityName:string,fixedPayment:boolean,counterAnount:number,tariffAmount:number){  
    for (let key of this.tariffs){
      if (key.utilityName===utilityName){
        this.tariffsService.updateTariff({id:key.id, utilityName:key.utilityName, tariff: tariffAmount, counterForPreviousMonth:counterAnount,fixedPayment:key.fixedPayment}).subscribe();
      }
     }
     this.getTariffs();  
  }


  formValidationVariableCounter(utilityName:string,counterAnount:any){
    this.selectedUtility = utilityName;
    if ( counterAnount.length > 5 || counterAnount < 0){
      this.validatorVariableCounter = true
    }else{
      this.validatorVariableCounter = false
    } 
  }

  formValidationVariableTariff(utilityName:string,tariffAmount:any){
    this.selectedUtility = utilityName;
    if (tariffAmount.length > 5 || tariffAmount < 0 ){
      this.validatorVariableTariff = true
    }else{
      this.validatorVariableTariff = false
    }
  }

  formValidationFixed(utilityName:string,tariffAmount:any){
    this.selectedUtility = utilityName;
    if (tariffAmount.length > 5 || tariffAmount < 0){
      this.validatorFixedTariff = true
    }else{
      this.validatorFixedTariff = false
    }
  }

  formValidationNewUtility(utilityName:string){
    if(isNaN(+utilityName)){
      for (let key of this.tariffs){
        if (key.utilityName.toLowerCase()===utilityName.toLowerCase()){
          this.validatorNewUtility = true;
          break
        }
        else{
          this.validatorNewUtility = false;
        } 
      }
    }else{
      this.validatorNewUtility = true; 
    }
  }

  showAlert(name:string){
    document.getElementById(name).classList.remove("hide");
    setInterval(function() {
      document.getElementById(name).classList.add("hide");
    }, 3000);
  }




  deleteTariff(utilityId:number){
    this.tariffsService.deleteTariff(utilityId).subscribe();
    this.getTariffs();
  }






   // Modal Window
   openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template, {class: 'modal-md'});
   }


  
  //Get tariffs data
  getTariffs(): void {
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;
    });
  }


    
  

}
