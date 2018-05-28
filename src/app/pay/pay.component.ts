import { Component, OnInit, Input,TemplateRef} from '@angular/core';
import {PaymentService} from '../payment.service';
import { Payment,Tariff } from '../payment';
import {TariffsService} from '../tariffs.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.sass']
})
export class PayComponent implements OnInit {


  modalRef: BsModalRef;
 
  payments:Payment[];
  payment = [];
  selectedMonth:any;
  selectedUtility:string;
  paymentAmount:number;
  historyCounter:number;
  tariffs:Tariff[];
  totalCalculation=0;
  stringTotalCalculation='';

  validatorVariablePaymnetAmount: boolean = false;
  validatorVariableCalculation: boolean = false;
  validatorFixedPaymnetAmount: boolean = false;


  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();



  constructor(private paymentService: PaymentService, private tariffsService: TariffsService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getTariffs();
    this.getPayments();
  }

  updatePayment(amountOfPayment:number,utility:string,selectedMonth: any){
    selectedMonth = this.getMonthNumber(selectedMonth);
    let addPaymentAmounts = 0;
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      for( let key of this.payments){
        if(key.utilityName === utility && key.year===this.currentYear && key.month===selectedMonth){
          addPaymentAmounts = key.amountPayment + amountOfPayment;
          this.paymentService.updatePayment({id:key.id, utilityName:utility,year:this.currentYear,month:selectedMonth,amountPayment:addPaymentAmounts}).subscribe();
        }
      }
    });
  }

  addPayment(amountOfPayment:number,utility:string,selectedMonth: any){
    selectedMonth = this.getMonthNumber(selectedMonth);
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      this.paymentService.addPayment({ id:this.payments.length+1, utilityName:utility,year:this.currentYear,month:selectedMonth,amountPayment:amountOfPayment } as Payment)
      .subscribe(data => 
        this.payments.push(data));
    });
  }

  getMonthNumber(selectedMonth:any){
    let monthNumber = 0
    let months= [ " ","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    for (let m of months){
      if (m===selectedMonth){
        selectedMonth = monthNumber
      }
      monthNumber+=1;
    }
    return selectedMonth
  }


   getPaymentInformation(amountOfPayment:number,utility:string, selectedMonth: any,confirmPayment:TemplateRef<any>,confirmUpdate:TemplateRef<any>){
    this.paymentAmount = 0;
    selectedMonth = this.getMonthNumber(selectedMonth);
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      let n=0;
      for( let key of this.payments){
        if(key.utilityName === utility && key.year===this.currentYear && key.month===selectedMonth){
          this.openModal(confirmUpdate);
          this.paymentAmount = key.amountPayment;
        }else{
          n+=1;
          if (n===this.payments.length){
            this.openModal(confirmPayment);
          }
        } 
      }
    });   
  }



  getCalculateInformation(counterForThisMonth:any , utility:string){
    this.totalCalculation = 0;
    this.selectedUtility = utility;
    for (let key of this.tariffs){ 
      if (utility === key.utilityName){
        this.totalCalculation = (counterForThisMonth - key.counterForPreviousMonth) * key.tariff;
      }
    }
    this.formValidationVariablePayment(counterForThisMonth,utility);
    document.getElementById("VariblePriceButton").classList.remove("cursor-off");
  }


  //Forms Validation


  formValidationVariablePayment(amountOfPayment:any,utility:string){
    this.selectedUtility = utility;
    if (amountOfPayment.length > 5 || amountOfPayment < 0){
      this.validatorVariablePaymnetAmount = true
    }else{
      this.validatorVariablePaymnetAmount = false
    }
  }

  formValidationVariableCalculation(counterForThisMonth:any,utility:string){
    this.selectedUtility = utility;
    if (counterForThisMonth.length > 5 || counterForThisMonth < 0){
      this.validatorVariableCalculation = true;
    }else{
      for (let key of this.tariffs){ 
        if (utility === key.utilityName){
          if(counterForThisMonth != key.counterForPreviousMonth && counterForThisMonth > key.counterForPreviousMonth){
            this.validatorVariableCalculation = false;
          }else{
            this.validatorVariableCalculation = true;
          }
        }
      }
    }
  }


  formValidationFixedPayment(amountOfPaymentFixed:any,utility:string){
    this.selectedUtility = utility;
    if ( amountOfPaymentFixed.length > 5 || amountOfPaymentFixed < 0 ){
      this.validatorFixedPaymnetAmount = true
    }else{
      this.validatorFixedPaymnetAmount = false 
    }
  }


  showAlert(name:string){
    document.getElementById(name).classList.remove("hide");
    setInterval(function() {
      document.getElementById(name).classList.add("hide");
    }, 3000);
  }







  //Get data from DataBase

  getPayments(){
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
    });
  }

  getTariffs(): void {
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;
    });
  }

  deleteTariff(utilityName:number){
    this.tariffsService.deleteTariff(utilityName).subscribe();
    this.getTariffs();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

 
}




  




 

 


  
  
