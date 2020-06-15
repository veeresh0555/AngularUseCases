import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
/**
 * @description LoginService, Authenticate Customers only Login. All Login related Operations perform here
 */
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

  /**
   * @description this function get all the user information
   */
  getData=(url,email)=>{
    console.log(url + "?email=" + email);
    return this.http.get(url + "?email=" + email);
  }

}
