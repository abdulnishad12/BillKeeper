import { Component, OnInit } from '@angular/core';
import {PAYMENTS,YEARS,MONTHS,UTILITIES,SETTINGS,DATEPICKER} from '../mock-payment'

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.sass']
})
export class PayComponent implements OnInit {
 
 	utilities= UTILITIES
 	years = YEARS


  constructor() { }

  ngOnInit() {
  }

}

