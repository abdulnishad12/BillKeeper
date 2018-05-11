import { Component, OnInit } from '@angular/core';
import {PAYMENTS,MONTHS,UTILITIES,SETTINGS,DATEPICKER} from '../mock-payment';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.sass']
})
export class PayComponent implements OnInit {
 
 	utilities= UTILITIES


  constructor() { }

  ngOnInit() {
  }

}

