import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * @description Fund transfer service perform all the transfer related operations done here
 */
export class FundTransferService {

  constructor(private http:HttpClient) { }
  /**
   * @description update function to update the data which are recieve the request
   */
  updateData = (url, putObj) => {
    return this.http.put(url, putObj);
  }

  /**
   * @description Below function to post the data. If recieved the request data shuld be post to backend server
   */
  addData = (url, postObj) => {
    return this.http.post(url, postObj);
  }
  /**
   * @description getData function to get all the account/ are any request data from database 
   */
  getData=(url,reqdata)=>{
    console.log(url+"?accountNo="+reqdata)
    return this.http.get(url+"?accountNo="+reqdata);
  }



}
