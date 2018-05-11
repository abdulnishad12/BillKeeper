import { Injectable } from '@angular/core';
import { PAYMENTS } from './mock-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

	payment = PAYMENTS;
	months=[];

	getPaymentInformation(){
		for (let key of this.payment){
			if(this.months.indexOf(key.month)==-1){
				this.months.push(key.month);
			}
		}
	}

	getMonths(){
		this.getPaymentInformation();
		return this.months;
	}

  constructor() { }
}
