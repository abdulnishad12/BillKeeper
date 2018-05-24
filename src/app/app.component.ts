import { Component, Output, EventEmitter } from '@angular/core';
import { PaymentService } from './payment.service';
import { setTheme } from 'ngx-bootstrap/utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {



	constructor(private paymentService: PaymentService){
		setTheme('bs4');
	}

	ngOnInit() {

  }



  




  title = 'BillKeeper';
}
