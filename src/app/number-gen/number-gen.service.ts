import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

export interface ICommand {
 isNumeric?: boolean;
  isAlpha?: boolean;
  isDouble?:boolean;
  inputSize?:number;
  cType?:number;
}

export interface IRealTime {
  counter3?: number;
  counter2?:number;
  counter1?:number;
  
}

export interface IReport {
  totalNumbers?: number;
  totalInt?:number;
  totalDouble?:number;
  totalAlph?:number;
  numbers?:any;
}


@Injectable()
export class NumberGeneSrvice {
  sendUrl =  'http://localhost:54659/api/NumGen/Command';  
  StopUrl =  'http://localhost:54659/api/NumGen/Stop'; 
  countUrl =  'http://localhost:54659/api/NumGen/counter'; 
  reportUrl =  'http://localhost:54659/api/NumGen/Reports'; 

  constructor(
    private http: HttpClient) {
  }

 getCount(): Observable<any> {
    return this.http.get<any>(this.countUrl);
  }

  getReport(): Observable<any> {
    return this.http.get<any>(this.reportUrl);
  }

  sendStartReq(value:any): Observable<any> {
    return this.http.post<any>(this.sendUrl, JSON.stringify(value), httpOptions);
  }

  sendEndReq(value:any): Observable<any> {
    return this.http.post<any>(this.StopUrl, JSON.stringify(value), httpOptions);
  }

}