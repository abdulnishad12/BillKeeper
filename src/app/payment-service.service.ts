import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
	
	culculate(number,array){
		for(let i=0; i=number;i++){
			array.push(i);
		}
	}
	

  constructor() { }
}
