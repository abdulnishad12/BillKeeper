import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from './payment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  private paymentUrl = 'api/payments';

  currentYear = new Date().getFullYear();
  selectedYear = new Date().getFullYear();

  uniqueYears = [];
  uniqueMonths = [];
  paymentsForSelectedYear = [];
  totalByMonth = [];

  payments: Payment[];

  constructor(private http: HttpClient) {
  }


  // Http Methods

  getPaymentsForSelectedYear (year: number): Observable<Payment[]> {
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
  updatePayment(amountOfPayment: number, utility: string, selectedMonth: any) {
    selectedMonth = this.transformNameOfMonthToNumber(selectedMonth);
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
  addPayment(amountOfPayment: number, utility: string, selectedMonth: any) {
    selectedMonth = this.transformNameOfMonthToNumber(selectedMonth);
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
  transformNameOfMonthToNumber(selectedMonth: any): number {
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

  // Find unique Years from Payments
  findUniqueYearsInPayments () {
    this.getPayments().subscribe(data => {this.payments = data;
      for (const i of this.payments) {
        if (this.uniqueYears.indexOf(i.year) === -1) {
          this.uniqueYears.push(i.year);
        }
      }
      if (this.uniqueYears.length === 0 ) {
        this.uniqueYears.push(this.selectedYear);
      }
      this.uniqueYears.sort(this.yearsOrder);
    });
    return this.uniqueYears;
  }
  // Sort years from biggest to littlest
  yearsOrder(a, b) {
    if (a > b) { return -1; }
    if (a < b) { return 1; }
  }
  // Find unique Months from Payments for selected year
  findUniqueMonths(selectedYear: number) {
    this.uniqueMonths = [];
    this. getPaymentsForSelectedYear(selectedYear).subscribe(data => {this.paymentsForSelectedYear = data;
      for (const key of this.paymentsForSelectedYear) {
        if (this.uniqueMonths.indexOf(key.month) === -1) {
          this.uniqueMonths.push(key.month);
        }
      }
      this.uniqueMonths.sort(this.monthsOrder);
    });
    return this.uniqueMonths;
  }
  // Sort months from 0 to 11
  monthsOrder(a, b) {
    if (a > b) { return 1; }
    if (a < b) { return -1; }
  }

  // Total for each unique month in selected Year
  totalOfEachMonth() {
    this.totalByMonth = [];
    let totalMonth = 0;
    for (const key of this.uniqueMonths) {
      for (const i of this.paymentsForSelectedYear) {
        if (key === i.month) {
          totalMonth += i.amountPayment;
        }
      }
      this.totalByMonth.push({month: key, totalOfMonth: totalMonth});
      totalMonth = 0;
    }
    return this.totalByMonth;
  }

}


