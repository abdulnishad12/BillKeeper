import { Injectable } from '@angular/core';
import { PAYMENTS } from './mock-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

	payment = PAYMENTS;
	months=[];
	years=[];
	utilities=[];
	totalOfUtility=[];
	totalOfUtilities= 0;
	totalOfMonth=[];
	totalOfMonths= 0;

	yearsOrder(a, b) {
		if (a > b) return -1;
		if (a < b) return 1;
	}

	getMonthsInformation(){
		for (let key of this.payment){
			if(this.months.indexOf(key.month)==-1){
				this.months.push(key.month);
			}
		}
		return this.months;
	}

	getYearsInformation(){
		for (let key of this.payment){
			if(this.years.indexOf(key.year)==-1){
				this.years.push(key.year)
			}
		}
		return this.years.sort(this.yearsOrder);
	}

	getUtilitiesInformation(){
		this.utilities=[];
		for (let key of this.payment){
			if(this.utilities.indexOf(key.utility)==-1){
				this.utilities.push(key.utility)
			}
		}
		return this.utilities;
	}

	getTotalOfUtilityInformation(){
		this.totalOfUtility=[];
		for (let i of this.utilities){
			let UtilityTotal = 0;
			for(let j of this.payment){
				if(i===j.utility){
					UtilityTotal+=j.total;
				}
			}
			this.totalOfUtility.push({utility:i,total:UtilityTotal})	
		}
		return this.totalOfUtility;
	}
	
	getTotalOfUtilitiesInformation(){
		for(let key of this.totalOfUtility){
			this.totalOfUtilities= this.totalOfUtilities + key.total;
		}
		return this.totalOfUtilities
	}

	getTotalOfMonthInformation(){
		this.totalOfMonth=[];
		for (let i of this.months){
			let MonthTotal = 0;
			for(let j of this.payment){
				if(i===j.month){
					MonthTotal+=j.total;
				}
			}
			this.totalOfMonth.push({month:i,total:MonthTotal})	
		}
		return this.totalOfMonth;
	}

	getTotalOfMonthsInformation(){
		for(let key of this.totalOfMonth){
			this.totalOfMonths= this.totalOfMonths + key.total;
		}
		return this.totalOfMonths
	}

	


  constructor() { }
}
