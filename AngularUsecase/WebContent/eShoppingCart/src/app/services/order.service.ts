import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ServerURL = environment.serverURL;
  constructor(private http: HttpClient) {
  }

  /**
   * @description order placed using this function
   */
postData=(url,postObject)=>{
  return this.http.post(url,postObject);
}
/**
 * 
 * @param url 
 * @param email 
 * 
 * @description Get all Orders based user email Id
 */
getAllOrders(url,email){
  return this.http.get(url+"?userEmail=" + email);
}

}


