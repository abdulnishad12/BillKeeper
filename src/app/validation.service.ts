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
		return validateInput.length > this.maxLengthOfInput || +validateInput < 0 );
	}

	formValidationUniqueAndOnlyChars(validateInput:string, tariffsArray:any){
		if (!/^[a-zA-Z]+$/.test(validateInput)) {
			return true;
		}
		for (const key of tariffsArray) {
			if (key.utilityName.toLowerCase() === validateInput.toLowerCase()) {
				return true;
			}
		} 
		return false;
	}

	formValidationPreviousCounterLargerThanCurrent(validateInput:string,compareUtilityName: string){
		if (validateInput.length > this.maxLengthOfInput || +validateInput < 0){
			return true;
		} 
		for (const key of this.tariffs) {
			if (compareUtilityName === key.utilityName) {
				if (+validateInput !== key.counterForPreviousMonth && +validateInput > key.counterForPreviousMonth) {
					if(key.tariff != 0){
						return false;
					}
				}
			}
		}
		return true
	}

	getTariffs(){
		this.http.get<Tariff[]>(this.tariffUrl).subscribe(data => {this.tariffs = data;
    });
	}




}
