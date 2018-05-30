import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Payment} from './payment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  private paymentUrl = 'api/payments';

  currentYear = new Date().getFullYear();

  selectedYear = new Date().getFullYear();

  payments: Payment[];

  constructor(private http: HttpClient) {
    this.getPayments();
    this.getPaymentsByYear(this.selectedYear);
  }


  // Http Methods

  getPaymentsByYear (year: number): Observable<Payment[]> {
    const url = `${this.paymentUrl}/?year=${year}`;
    return this.http.get<Payment[]>(url);
  }
  getPayments() {
    return this.http.get<Payment[]>(this.paymentUrl);
  }
  postPayment (payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.paymentUrl, payment, httpOptions);
  }

  putPayment (payment: Payment): Observable<any> {
    return this.http.put(this.paymentUrl, payment, httpOptions);
  }

  // Update payment amount of chose date and utility
  updatePaymentInService(amountOfPayment: number, utility: string, selectedMonth: any) {
    selectedMonth = this.getMonthNumber(selectedMonth);
    this.getPayments().subscribe(data => {this.payments = data;
      for ( const key of this.payments) {
        if (key.utilityName === utility && key.year === this.currentYear && key.month === selectedMonth) {
          this.putPayment(
            {id: key.id,
              utilityName: utility,
              year: this.currentYear,
              month: selectedMonth,
              amountPayment: key.amountPayment + amountOfPayment}).subscribe();
        }
      }
    });
  }
  // Add new payment amount with chose date and utility
  addPaymentInService(amountOfPayment: number, utility: string, selectedMonth: any) {
    selectedMonth = this.getMonthNumber(selectedMonth);
    this.getPayments().subscribe(data => {this.payments = data;
      this.postPayment(
        { id: this.payments.length + 1,
          utilityName: utility,
          year: this.currentYear,
          month: selectedMonth,
          amountPayment: amountOfPayment } as Payment)
        .subscribe(cont =>
          this.payments.push(cont));
    });
  }

  // Transform Month from name to number
  getMonthNumber (selectedMonth: any) {
    let monthNumber = 0;
    const months = [
      ' ',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December' ];
    for (const m of months) {
      if (m === selectedMonth) {
        return selectedMonth = monthNumber;
      }
      monthNumber += 1;
    }
  }

}


