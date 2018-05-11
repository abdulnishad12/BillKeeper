import { Component, OnInit,Input } from '@angular/core';
import {PAYMENTS,UTILITIES} from '../mock-payment';
// import {Months} from '../payment'

import {DataService} from '../data.service'
import {PaymentService} from '../payment.service'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {
  payment = PAYMENTS
  utilities = UTILITIES

  // months: Months[];
  years=[];
  yearsOrMonths=[];
  months=[];
  

  totalMonths = 0
  totalYears = 0

  isActive1 = true
  isActive2 = false

  selectedYear=new Date().getFullYear();

  constructor(private dataService: DataService,private paymentService: PaymentService) { }

  ngOnInit() {
    this.months = this.paymentService.getMonths();
    this.years = this.dataService.getTest();
    this.yearsOrMonths=this.years;
    console.log(this.months);
  }

}
