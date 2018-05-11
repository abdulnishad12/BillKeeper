import { Component, OnInit,Input } from '@angular/core';
import {PAYMENTS,MONTHS,UTILITIES} from '../mock-payment'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {
  payment = PAYMENTS
  months = MONTHS
  utilities = UTILITIES
  

  totalMonths = 0
  totalYears = 0

  isActive1 = true
  isActive2 = false

  selectedYear=new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    for (let p of this.utilities) {
      this.totalMonths += p.total;
    }
    for (let p of this.months) {
      this.totalYears += p.total;
    }


  }

}
