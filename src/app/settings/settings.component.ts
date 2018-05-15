import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import {PaymentService} from '../payment.service'


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

	
  utilities=[];
  settings=[];
	  

  constructor(private dataService: DataService,private paymentService: PaymentService) { }

  ngOnInit() { 
    this.utilities = this.paymentService.getUtilitiesInformation();
    this.settings = this.dataService.getSettings();
  }

  getSettingsInformation(counterPreviousMonth:number,tarifOfUtility:number,utility:string) {
    if (this.settings.length < 1 || this.settings == undefined){
      this.settings.push({utilityName:utility,tarif:tarifOfUtility,previouseCounter:counterPreviousMonth});
    }else{
      let n = 0;
      for (let key of this.settings){
        if(key.utilityName===utility){
          this.settings.splice(n,n);
        }
        n+=1;
      }
      this.settings.push({utilityName:utility,tarif:tarifOfUtility,previouseCounter:counterPreviousMonth});    
    }
    return this.settings
  }



  





}
