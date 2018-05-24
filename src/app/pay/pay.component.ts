import { Component, OnInit, Input } from '@angular/core';
import {PaymentService} from '../payment.service';
import { Payment,Tariff } from '../payment';
import {TariffsService} from '../tariffs.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.sass']
})
export class PayComponent implements OnInit {



 
  payments:Payment[];
  payment = [];
  selectedMonth:any;
  selectedUtility:string;
  paymentAmount:number;
  historyCounter:number;
  tariffs:Tariff[];
  totalCalculation=0;



  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();

  constructor(private paymentService: PaymentService, private tariffsService: TariffsService) { }

  ngOnInit() {
    this.getTariffs();
    this.getPayments();
  }


   getPaymentInformation(amountOfPayment:number,utility:string, selectedMonth: any){
    let monthNumber = 0
    let months= [ " ","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    for (let m of months){
      if (m===selectedMonth){
        selectedMonth = monthNumber
      }
      monthNumber+=1;
    }
    console.log(utility);
    if (amountOfPayment===0 || amountOfPayment < 0 || amountOfPayment===undefined){
      alert ('Please enter corect payment amount')
    }else{
      this.paymentService.getPayments().subscribe(data => {this.payments = data;
        let n=0;
        let addPaymentAmounts = 0;
        for( let key of this.payments){
          if(key.utilityName === utility && key.year===this.currentYear && key.month===selectedMonth){
            if (confirm(
              `You have already done payment for this date
              Amount of payment: ${key.amountPayment}$
              Do you want to make an additional payment`)){
              addPaymentAmounts = key.amountPayment + amountOfPayment;
              this.paymentService.updatePayment({id:key.id, utilityName:utility,year:this.currentYear,month:selectedMonth,amountPayment:addPaymentAmounts}).subscribe();
          }else{
            break;
          }  
        }else{
          n+=1;
          if (n===this.payments.length){
            this.paymentService.addPayment({ id:this.payments.length+1, utilityName:utility,year:this.currentYear,month:selectedMonth,amountPayment:amountOfPayment } as Payment)
            .subscribe(data => 
              this.payments.push(data));
            this.paymentService.getPayments().subscribe(data => this.payments = data);
            alert (`Payment for : ${amountOfPayment}$ done`);
          } 
        }
      }
      console.log(this.payments);
    });
    }
    
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
    });  
  }

    
  getPayments(){
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      this.historyCounter = this.payments.length;
    });
  }

  getTariffs(): void {
    this.tariffsService.getTariffs().subscribe(data => {this.tariffs = data;
    });
  }

  reciveMassage($event){
    this.message = $event;
  }
 
}




  




 

 


  
  
