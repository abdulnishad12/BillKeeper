import { Injectable } from '@angular/core';
import { MONTHS } from './mock-payment'

@Injectable({
  providedIn: 'root'
})
export class DataService {

	years=[new Date().getFullYear()];
	startYear=new Date().getFullYear();


	getMonths(){
		return MONTHS;
	}
	getTest(){
		return this.years;
	}
	getStartYear(){
		return this.startYear
	}

  constructor() { }
}
