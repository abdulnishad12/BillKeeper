import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Tariff } from './payment';
import { HttpClient,HttpHeaders } from '@angular/common/http'



const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})



export class ValidationService {

	public tariffs: Tariff[];
	maxLengthOfInput = 5;

	private tariffUrl = 'api/tariffs';

	constructor(private http: HttpClient) { 
		this.getTariffs();
	}

	formValidationLengthAndPositive(validateInput: string, ){
		if (validateInput.length > this.maxLengthOfInput || +validateInput < 0 ) {
      return true;
    } else {
      return false;
    }
	}

	formValidationNoReapeatAndOnlyNumbers(validateInput:string){
		if (isNaN(+validateInput)) {
			let i = 0;
			for (const key of this.tariffs) {
				i += 1;
				if (key.utilityName.toLowerCase() === validateInput.toLowerCase()) {
					return true;
				} else if (i === this.tariffs.length) {
					return false;
				}
			}
		} else {
			return true;
		}
	}

	formValidationLengthPositivePreviousCounterLargerThanCurrent(validateInput:string,compareUtilityName: string){
		if (validateInput.length > this.maxLengthOfInput || +validateInput < 0){
			return true;
		} else {
			for (const key of this.tariffs) {
				if (compareUtilityName === key.utilityName) {
					if (+validateInput !== key.counterForPreviousMonth && +validateInput > key.counterForPreviousMonth) {
						if(key.tariff === 0){
							return true;
						}else{
							return false;
						}
					}
				}
			}
		}
	}

	getTariffs(){
		this.http.get<Tariff[]>(this.tariffUrl).subscribe(data => {this.tariffs = data;
    });
	}




}
