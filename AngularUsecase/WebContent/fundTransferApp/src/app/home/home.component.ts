import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';
import { Customer } from '../models/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * @description This component to be desplay account holder information with balance by default like dashboard
 */
export class HomeComponent implements OnInit {
 
  baseUrl:string=`${environment.serverURL}/customers`;
  customers:Customer;
  loginSuccess: boolean=false;

  /**
   * 
   * @param loginService 
   * @param router 
   */
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {

    this.getCustomerData();

  }

  /**
   * @description this function get all the customer data
   */
  getCustomerData(){
    this.loginSuccess = true;
    let semail= sessionStorage.getItem("email");
    console.log("email id: "+semail);
    this.loginService.getData(this.baseUrl,semail)
    .subscribe((response:Customer)=>{
      this.customers=response;
      sessionStorage.setItem("loginuser",this.customers[0].custname);
      sessionStorage.setItem("logincustomer",JSON.stringify(this.customers[0]));
      });
  }

}
