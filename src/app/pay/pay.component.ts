import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../payment.service'
import {DataService} from '../data.service'

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.sass']
})
export class PayComponent implements OnInit {
 
 	utilities = [];
 	total=[];
 	settings=[];
 	totalOfCalculation= 0;
 	payment = [];
 	selectedMonth:any;
 	selectedYear:any;


  constructor(private paymentService: PaymentService,private dataService: DataService) { }

  ngOnInit() {
  	this.utilities = this.paymentService.getUtilitiesInformation();
  	this.settings = this.dataService.getSettings();
  	this.payment = this.paymentService.getPaymentInformation()
  }

  getCalculateInformation(counterForThisMonth:number,utility:string){
		for (let key of this.settings) {
			if (key.utilityName===utility){
				this.totalOfCalculation = (counterForThisMonth - key.previouseCounter) * key.tarif
			}
		}
  }

  getPaymentInformation(amountOfPaymentThisMonth:number,utility:string,date: any){
  	let idNow = this.payment.length + 1;
    let n = 0;
    date = date.split('-');
    this.selectedMonth = parseInt(date[1], 10);
    this.selectedYear = parseInt(date[0], 10);
    this.payment.push({id:idNow,utility:utility,year:this.selectedYear,month:this.selectedMonth,total:amountOfPaymentThisMonth}); 
    console.log(this.payment);  
  }


}

