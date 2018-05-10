import { Component, OnInit } from '@angular/core';
import {PAYMENTS,YEARS,MONTHS,UTILITIES,SETTINGS,DATEPICKER} from '../mock-payment';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

	years = YEARS

	startYear=2015;
	currentYear=new Date().getFullYear();

	numberOfYears = this.currentYear - this.startYear
	range = {
		from: 1,
		to: this.numberOfYears
	}

	yearss=[this.currentYear]

  constructor() { }

  ngOnInit() {

  	for (let i=1; i = this.numberOfYears;i++) {
  		this.yearss.push(this.currentYear - i) 
		}
		console.log(this.yearss);
  	
  }

}
