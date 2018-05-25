import { Component, OnInit, Input,TemplateRef } from '@angular/core';
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

  validatorVariablePaymnetAmount: boolean = false;
  validatorVariableCalculation: boolean = false;
  validatorFixedPaymnetAmount: boolean = false;


  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();



  constructor(private paymentService: PaymentService, private tariffsService: TariffsService,private modalService: BsModalService) { }

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
    this.paymentAmount = amountOfPayment;
    selectedMonth = this.getMonthNumber(selectedMonth);
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      let n=0;
      for( let key of this.payments){
        if(key.utilityName === utility && key.year===this.currentYear && key.month===selectedMonth){
          this.openModal(confirmUpdate);
        }else{
          n+=1;
          if (n===this.payments.length){
            this.openModal(confirmPayment);
          }
        } 
      }
    });   
  }



  getCalculateInformation(counterForThisMonth:number , utility:string){
    this.totalCalculation = 0;
    this.selectedUtility = utility;
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;
      for (let key of this.tariffs){ 
        if (utility === key.utilityName){
          this.totalCalculation = (counterForThisMonth - key.counterForPreviousMonth) * key.tariff;
        }
      }
      this.paymentAmount = this.totalCalculation;
    });  
  }


  //Forms Validation


  formValidationVariablePayment(amountOfPayment:any,utility:string, selectedMonth: any,confirmVariablePayment:TemplateRef<any>,confirmVariableUpdate:TemplateRef<any>){
    this.selectedUtility = utility;
    if (amountOfPayment===0 || amountOfPayment===null || amountOfPayment===undefined || amountOfPayment===''){
      this.validatorVariablePaymnetAmount = true
    }else{
      if (!isNaN(amountOfPayment)){
        this.validatorVariablePaymnetAmount = false
      }else{
        this.validatorVariablePaymnetAmount = true
      }  
    }
    if(!this.validatorVariablePaymnetAmount){
      this.getPaymentInformation(amountOfPayment,utility, selectedMonth,confirmVariablePayment,confirmVariableUpdate)
    }
  }

  formValidationVariableCalculation(counterForThisMonth:any,utility:string){
    this.selectedUtility = utility;
    if (counterForThisMonth===0 || counterForThisMonth===null || counterForThisMonth===undefined || counterForThisMonth===''){
      this.validatorVariableCalculation = true
    }else{
      if (!isNaN(counterForThisMonth)){
        this.validatorVariableCalculation = false
      }else{
        this.validatorVariableCalculation = true
      }  
    }
    if(!this.validatorVariableCalculation){
      this.getCalculateInformation(counterForThisMonth,utility);
    }
  }


  formValidationFixedPayment(amountOfPaymentFixed:any,utility:string,selectedMonth:any,confirmFixedPayment:TemplateRef<any>,confirmFixedUpdate:TemplateRef<any>){
    this.selectedUtility = utility;
    if (amountOfPaymentFixed===0 || amountOfPaymentFixed===null || amountOfPaymentFixed===undefined || amountOfPaymentFixed===''){
      this.validatorFixedPaymnetAmount = true
    }else{
      if (!isNaN(amountOfPaymentFixed)){
        this.validatorFixedPaymnetAmount = false
      }else{
        this.validatorFixedPaymnetAmount = true
      }  
    }
    if(!this.validatorFixedPaymnetAmount){
      this.getPaymentInformation(amountOfPaymentFixed,utility, selectedMonth,confirmFixedPayment,confirmFixedUpdate)
    }
  }










  //Get data from DataBase

  getPayments(){
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      this.historyCounter = this.payments.length;
    });
  }

  getTariffs(): void {
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

 
}




  




 

 


  
  
