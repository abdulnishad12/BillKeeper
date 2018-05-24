import { Injectable } from '@angular/core';
import { Tariff } from './payment';
import { Observable } from 'rxjs'
import { HttpClient,HttpHeaders } from '@angular/common/http'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TariffsService {

  public tariffs: Tariff[];
  public utilities = [];
  public uniqueUtilitiesList = [];

	private tariffUrl = 'api/tariffs';





  constructor(private http: HttpClient) { }


  getTariffs(){
		return this.http.get<Tariff[]>(this.tariffUrl);
	}

  addTariff(tariff: Tariff): Observable<Tariff> {
    return this.http.post<Tariff>(this.tariffUrl, tariff, httpOptions)
  };

  updateTariff(tariff:Tariff): Observable<any> {
    return this.http.put(this.tariffUrl, tariff, httpOptions)
  };

  getUniqueUtilities(){
    this.utilities=[];
    this.getTariffs().subscribe(data => {this.tariffs = data;
      for (let key of this.tariffs){
        if (!this.utilities.length){
          this.utilities.push({utilityName:key.utilityName,fixedPayment:key.fixedPayment});
        }else{
          if(this.utilities.indexOf(key.utilityName)==-1){
            this.utilities.push({utilityName:key.utilityName,fixedPayment:key.fixedPayment});
          }
        }
      }
    });
    return this.utilities;
  }





}
