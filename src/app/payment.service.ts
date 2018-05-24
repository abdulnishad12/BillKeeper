import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient,HttpHeaders } from '@angular/common/http'
import {Payment} from './payment'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {



	
	private paymentUrl = 'api/payments';
  message:string;


		


  constructor(private http: HttpClient) {}

  getMassage(){
    return this.message
  }


  getPaymentsByYear (year:number): Observable<Payment[]>{
  	const url = `${this.paymentUrl}/?year=${year}`
		return this.http.get<Payment[]>(url)  
	}

	getPayments(){
		return this.http.get<Payment[]>(this.paymentUrl);
	}

	addPayment (payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.paymentUrl, payment, httpOptions)
  };

  updatePayment (payment:Payment): Observable<any> {
  	return this.http.put(this.paymentUrl, payment, httpOptions)
  };

  deletePayment (id:number): Observable<Payment> {
  	const url = `${this.paymentUrl}/${id}`;
  	return this.http.delete<Payment>(url, httpOptions)
  }

  changeSeatch(message: string) {
    this.messageSource.next(message)
  }


}


