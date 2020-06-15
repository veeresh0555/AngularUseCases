import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Customer } from '../models/customer.model';
import { AddBeneficiaryService } from '../services/banking/add-beneficiary.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
/**
 * @description AddBeneficiary related Operation
 */
export class AddBeneficiaryComponent implements OnInit {
  
  beneficiaryForm:FormGroup;
  submitted:boolean;
  baseUrl = `${environment.serverURL}/customers`;
  accountNo:number;
  customers: any;

  /**
  * 
  * @param beneficiaryService 
  * @param router 
  * @param toaster 
  */
  constructor(private beneficiaryService:AddBeneficiaryService,private router:Router,private toaster:ToastrService) {
      this.submitted = false;
   }
  /**
  * @description This method checks all the validations
  */
  ngOnInit(): void {
    this.submitted = true;
    this.beneficiaryForm = new FormGroup(
      {
        accountNo: new FormControl('',[Validators.required,Validators.maxLength(12)])
      })
      this.getFromAcToStorage();
  }
  /**
   * @description Below function get Customer Data from back-end
   */
  getFromAcToStorage=()=>{
    let logincustomer:Customer=JSON.parse(sessionStorage.getItem("logincustomer"));
    this.customers=logincustomer;
    this.accountNo=logincustomer.accountNo;
    this.benficiarySubmit(this.accountNo);
  }
  /**
   * @description when customer click Add beneficiary Button then call this method and checks all the validation and proceed
   */
  benficiarySubmit=(accountNumber)=>
  {
    console.log("Account Number: "+accountNumber);
    this.submitted = true;
    if(this.beneficiaryForm.valid)
    {
     this.registerBeneficiary(accountNumber);
    }
  }

 /**
  * @description Below function call 
  */
 registerBeneficiary=(accountNumber)=>
  {
    this.beneficiaryService.getBeneficiaryData(`${this.baseUrl}`,accountNumber).subscribe((response:Customer)=>{
      let output = response;
         
      if(output[0]===undefined)
      {
        this.toaster.error("Account Number does Not exist in the Database");
        return;
      }
      else{
        let loggedInUser = this.customers;
        loggedInUser.benificiary.push(accountNumber);
        this.beneficiaryService.updateData(`${this.baseUrl}/${this.customers.id}`,loggedInUser).subscribe((response)=>{ 
        this.toaster.success("Beneficiary added successfully");
        },
        (error)=>{
          this.toaster.error("Sorry! Operation Failed,Check Your Connections");
        })
      }
    },
    (error)=>{
      this.toaster.error("Error! You can check your connection");
    })
  }
 /**
  * @description This function navigate to  Dashboard
  */
  back=()=>
  {
    this.router.navigate(['/home']);;
  }

}

