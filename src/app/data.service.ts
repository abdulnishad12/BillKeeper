import { Injectable } from '@angular/core';
import { SETTINGS } from './mock-payment'

@Injectable({
  providedIn: 'root'
})
export class DataService {

	settings=SETTINGS;

	getSettings(){
		return this.settings;
	}


  constructor() { }
}
