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

  addTodo(counterPreveousMonth:number,tarifOfUtility:number,utility:string) {
    if (this.settings.length < 1 || this.settings == undefined){
      this.settings.push({utilityName:utility,tarif:tarifOfUtility,prevoiuseCounter:counterPreveousMonth});
    }else{
      let n = 0;
      for (let key of this.settings){
        if(key.utility===utility){
          this.settings.splice(n,n);
          this.settings.push({utilityName:utility,tarif:tarifOfUtility,prevoiuseCounter:counterPreveousMonth});
        }else{
          this.settings.push({utilityName:utility,tarif:tarifOfUtility,prevoiuseCounter:counterPreveousMonth});
        }
        n+=1;
      }
      this.settings.push({utilityName:utility,tarif:tarifOfUtility,prevoiuseCounter:counterPreveousMonth});    
    }
    console.log(this.settings);
  }



  





}
