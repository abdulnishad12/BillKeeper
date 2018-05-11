import { Component, OnInit } from '@angular/core';
import {PAYMENTS,MONTHS,UTILITIES,SETTINGS,DATEPICKER} from '../mock-payment';
import {DataService} from '../data.service'


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

	

	currentYear:number;
	numberOfYears: number;
	years=[new Date().getFullYear()];
	startYear=new Date().getFullYear();

	  

  constructor(private dataService: DataService) { }

  ngOnInit() { 
  	this.startYear=new Date().getFullYear();
  	this.currentYear=new Date().getFullYear();
    this.startYear = this.dataService.getStartYear();
  }

  click(startYear){
  	this.years=[];
  	this.numberOfYears = this.currentYear - this.startYear;
  	for(let i=0; i<this.numberOfYears+1;i++){
			this.years.push(this.currentYear-i);
		}			
  }

  click_test(){
    this.dataService.years = this.years;
    this.dataService.startYear=this.startYear;
  }

  





}
