import { Component, OnInit,Input } from '@angular/core';

import {PaymentService} from '../payment.service';
import { Payment,PaymentByMonth} from '../payment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  public paymentByYear:Payment[];
  public payments: Payment[];
  selectedYear = new Date().getFullYear();
  public years = [];
  public months = [];
  public paymentsNotRepeat=[];
  public utilities =[];
  public historyDisplay: PaymentByMonth[] =[];
  public totalByMonth = [];
  
  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.getPaymentByYear();
    this.getPayment(); 
  }

  yearsOrder(a, b) {
    if (a > b) return -1;
    if (a < b) return 1;
  }

  monthsOrder(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
  }

  getPaymentByYear(): void {
    this.paymentService.getPaymentsByYear(this.selectedYear).subscribe(data => {this.paymentByYear = data;
      
      //Find unique Months in DB for selected year
      this.months = [];
      for (let key of this.paymentByYear){
        if (!this.months.length){
          this.months.push(key.month)
        }else{
          if(this.months.indexOf(key.month)==-1){
            this.months.push(key.month)
          }
        } 
      }
      this.months.sort(this.monthsOrder);

      //Making parse DB to display on history page
      let u = 0;
      this.historyDisplay=[];
      for (let key of this.months){
        this.historyDisplay.push({month:key,payments:[]});
        for (let i of this.paymentByYear){
          if(key===i.month){
            this.historyDisplay[u].payments.push({utilityName:i.utilityName,amountPayment:i.amountPayment});
          }
        }
        u+=1;
      }

      //Find total of every month
      this.totalByMonth=[];
      let totalMonth = 0;
      for (let key of this.months){
        for (let u of this.paymentByYear){
          if (key==u.month){
            totalMonth+=u.amountPayment;
          }
        }
        this.totalByMonth.push({month:key,totalOfMonth:totalMonth})
        totalMonth = 0;
      }
    });
  }

  getPayment(): void {

    //Find unique Years in DB
    this.paymentService.getPayments().subscribe(data => {this.payments = data;
      for (let i of this.payments){
        if (!this.years.length){
          this.years.push(i.year)
        }else{
          if(this.years.indexOf(i.year)==-1){
            this.years.push(i.year)
          }
        }  
      } 
      this.years.sort(this.yearsOrder);     
    });
  }


 

}
