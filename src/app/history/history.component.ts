import { Component, OnInit,Input } from '@angular/core';
// import {Months} from '../payment'

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
  totalOfUtilities:number;
  totalOfMonth=[];
  totalOfMonths= 0;
  
  isActive1 = true;
  isActive2 = false;

  selectedYear=new Date().getFullYear();

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
  }

}
