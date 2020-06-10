import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /* 
  * @param url
  * @param email
  * @param password
  * @description This method validates user login
  * 
  */

 constructor(private http: HttpClient) { }
  validateLogin = (url, email, password) => {
    return this.http.get(url + "?email=" + email + "&password=" + password);
  }




  
  

}
