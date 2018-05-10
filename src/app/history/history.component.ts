import { Component, OnInit } from '@angular/core';
import {PAYMENTS,YEARS,MONTHS,UTILITIES} from '../mock-payment'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  payment = PAYMENTS
  years = YEARS
  months = MONTHS
  utilities = UTILITIES
  yearsOrMonths = YEARS

  totalMonths = 0
  totalYears = 0




  isActive1 = true;
  isActive2 = false;

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
