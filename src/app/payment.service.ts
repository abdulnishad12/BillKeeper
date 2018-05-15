import { Injectable } from '@angular/core';
import { PAYMENTS } from './mock-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

	payment = PAYMENTS;
	months=[];
	monthsInt=[];
	years=[];
	utilities=[];
	totalOfUtility=[];
	totalOfUtilities= 0;
	totalOfMonth=[];
	totalOfMonths= 0;
	monthTransform = [ "","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
// Order of list form hight to low and for low to higth
	yearsOrder(a, b) {
		if (a > b) return -1;
		if (a < b) return 1;
	}
	monthsOrder(a, b) {
		if (a > b) return 1;
		if (a < b) return -1;
	}


//return payment mock
	getPaymentInformation(){
		return PAYMENTS
	}

//return all exist years
	getYearsInformation(){
		for (let key of this.payment){
			if(this.years.indexOf(key.year)==-1){
				this.years.push(key.year)
			}
		}
		return this.years.sort(this.yearsOrder);
	}
//return all exist utilities
	getUtilitiesInformation(){
		this.utilities=[];
		for (let key of this.payment){
			if(this.utilities.indexOf(key.utility)==-1){
				this.utilities.push(key.utility)
			}
		}
		return this.utilities;
	}
// return total of every uilitity in aray of object with utility name
	getTotalOfUtilityInformation(){
		return this.totalOfUtility;
	}
// return total of all utilities as a number	
	getTotalOfUtilitiesInformation(){
		return this.totalOfUtilities
	}
// //return all exist months sort for first to last and transfrom from int to string
	getMonthsInformation(){
		this.months=[];
		for (let key of this.payment){
			if(this.months.indexOf(key.month)==-1){
				this.months.push(key.month);
			}
		}
		this.months = this.months.sort(this.monthsOrder);
		return this.months
	}
//return object with name of minth ant total of all utilities in this month
	getTotalOfMonthInformation(){
		this.totalOfMonth=[];
		for (let i of this.months){
			let MonthTotal = 0;
			for(let j of this.payment){
				if(i===j.month){
					MonthTotal+=j.total;
				}
			}
			this.totalOfMonth.push({month:i,total:MonthTotal,})	
		}
		return this.totalOfMonth;
	}
// return int of total of all months
	getTotalOfMonthsInformation(){
		this.totalOfMonths=0;
		for(let key of this.totalOfMonth){
			this.totalOfMonths= this.totalOfMonths + key.total;
		}
		return this.totalOfMonths
	}

	


  constructor() { }
}
