import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {


  nth = [
    "2019","2018","2017","2016", "2015"
  ]

  years= [
    "2019","2018","2017","2016", "2015"
  ]

  months = [
    "March","April","May","June","July"
  ]



  isActive1 = true;
  isActive2 = false;

  constructor() { }

  ngOnInit() {
  }

}
