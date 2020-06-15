import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


/**
 * @author veer
 * @description this servics uses for all beneficiary related operation can perform
 * 
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class AddBeneficiaryService {

  /**
   * 
   * @param http 
   */
  constructor(private http: HttpClient) { }


/**
 * @description this function get all the customer from back end
 * 
 */
getAllCustomers=(url)=>{
  console.log("url: "+url);
return this.http.get(url);
}
/**
 * 
 * @param url 
 * @param postObj 
 * @description this function store add beneficiary data in the backend
 */
potBeneficiaryData(url,postObj){
  return this.http.post(url, postObj);
}
/**
 * 
 * @param url 
 * 
 * @description this function get all the beneficiary details/account numbers which is already added to the account in back-end
 */
getBeneficiaryData(url,account){
console.log(url+"?accountNo="+account);
return this.http.get(url+"?accountNo="+account);
}

/**
 * @description any update Operation
 */
updateData = (url, putObj) => {
  return this.http.put(url, putObj);
}


}
