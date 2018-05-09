import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.sass']
})
export class PayComponent implements OnInit {
 
 	utilities= [
 		"Light","Gas","Water","Trash", "Another"
 	]


  constructor() { }

  ngOnInit() {
  }

}

