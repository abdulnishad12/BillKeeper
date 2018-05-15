import { Component, OnInit,Input } from '@angular/core';

import {DataService} from '../data.service'
import {PaymentService} from '../payment.service'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {
  
  years=[];
  yearsOrMonths=[];
  months=[];
  utilities=[];
  totalOfUtility=[];
  totalOfUtilityTest=[];
  totalOfUtilities:number;
  totalOfMonth=[];
  totalOfMonths= 0;
  payment=[];
  totalOfUtilityForYear = [];
  
  isActive1 = true;
  isActive2 = false;

  selectedYear = new Date().getFullYear();

  constructor(private dataService: DataService,private paymentService: PaymentService) { }

  ngOnInit() {
    this.months = this.paymentService.getMonthsInformation();
    this.years = this.paymentService.getYearsInformation();
    this.utilities =this.paymentService.getUtilitiesInformation();
    this.yearsOrMonths = this.years;
    this.totalOfUtility = this.paymentService.getTotalOfUtilityInformation();
    this.totalOfUtilities = this.paymentService.getTotalOfUtilitiesInformation();
    this.totalOfMonth = this.paymentService.getTotalOfMonthInformation();
    this.totalOfMonths = this.paymentService.getTotalOfMonthsInformation();
    this.payment = this.paymentService.getPaymentInformation();
    this.choseYear(this.selectedYear);
  }

  choseYear(selectedYear:number){
    this.totalOfUtility=[];
    this.totalOfUtilityForYear = [];
    this.totalOfUtilities=0;
    for (let key of this.payment){
      let UtilityTotal = 0;
      if (key.year == selectedYear){
        this.totalOfUtility.push({month:key.month,total:key.total,utility:key.utility});
        
      }
    }
    for (let i of this.totalOfUtility){
      if(this.totalOfUtilityTest.length === 0){
        this.totalOfUtilityTest.push(i);
      }else{
        for (let j of this.totalOfUtilityTest){
          if(this.totalOfUtilityTest.indexOf(i.month)==-1){
            this.totalOfUtilityTest.push(i);
          }else{
            i.total
          }
        }
      }
      // if(this.years.indexOf(key.year)==-1){
      //   this.years.push(key.year)
      // }
    }
    for(let key of this.totalOfUtility){
      this.totalOfUtilities= this.totalOfUtilities + key.total;
    }
 
  }

}
