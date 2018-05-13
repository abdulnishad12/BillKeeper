import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../payment.service'

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.sass']
})
export class PayComponent implements OnInit {
 
 	utilities = [];
 	total=[];


  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
  	this.utilities = this.paymentService.getUtilitiesInformation();
  }

}

