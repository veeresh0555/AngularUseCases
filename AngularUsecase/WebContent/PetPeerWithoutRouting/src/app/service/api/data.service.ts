import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private http: HttpClient) { }

  /**
  * @description This method validates user login
  * @param url
  * @param email
  * @param password
  */
  validateLogin = (url, email, password) => {
    return this.http.get(url + "?email=" + email + "&password=" + password);
  }
  /**
  * @description get pet data
  * @param url
  */
  getData = (url) => {
    return this.http.get(url);
  }

  /**
  * @description This method adds pet data 
  * @param url
  * @param postObj
  */
  addData = (url, postObj) => {
    return this.http.post(url, postObj);
  }

  /**
  * @description This method updates pet data 
  * @param url
  * @param putObj
  */
  updateData = (url, putObj) => {
    return this.http.put(url, putObj);
  }

  /**
  * @description This method deletes pet data 
  * @param id
  */
  deleteData = (id) => {
    return this.http.delete(id);
  }



}
