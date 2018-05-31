import { Injectable } from '@angular/core';
import { Utility } from './utility';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root',
})

export class UtilityService {


  private utilityUrl = 'api/utilities';





  constructor(private http: HttpClient) { }


  getUtilities(): Observable<Utility[]> {
    return this.http.get<Utility[]>(this.utilityUrl);
  }

  addUtility(utility: Utility): Observable<Utility> {
    return this.http.post<Utility>(this.utilityUrl, utility, httpOptions);
  }

  updateTariff(utility: Utility): Observable<any> {
    return this.http.put(this.utilityUrl, utility, httpOptions);
  }

  deleteUtility (id: number): Observable<Utility> {
    const url = `${this.utilityUrl}/${id}`;
    return this.http.delete<Utility>(url, httpOptions);
  }







}

