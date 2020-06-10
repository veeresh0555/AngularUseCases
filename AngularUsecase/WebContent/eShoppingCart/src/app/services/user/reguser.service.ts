import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReguserService {

  constructor(private http: HttpClient) { }
  
 /**
  * @description This method adds pet data 
  * @param url
  * @param postObj
  */
 addData = (url, postObj) => {
  return this.http.post(url, postObj);
}
}
