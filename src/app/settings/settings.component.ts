import { Component, OnInit } from '@angular/core';
import {PAYMENTS,MONTHS,UTILITIES,SETTINGS,DATEPICKER} from '../mock-payment';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

	

	currentYear:number;
	numberOfYears: number;
	years=[new Date().getFullYear()];
	startYear:number;

	
	
	

  constructor() { }

  ngOnInit() { 
  	this.startYear=new Date().getFullYear();
  	this.currentYear=new Date().getFullYear();
  }
  click(startYear){
  	this.years=[];
  	this.numberOfYears = this.currentYear - this.startYear;
  	for(let i=0; i<this.numberOfYears+1;i++){
			this.years.push(this.currentYear-i);
		}			
  }

}
