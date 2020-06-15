import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddBeneficiaryService } from '../services/banking/add-beneficiary.service';
import { Customer } from '../models/customer.model';
import { environment } from 'src/environments/environment';

import { FormGroup } from '@angular/forms';
import { FundTransfer } from '../models/fund-transfer.model';
import { ToastrService } from 'ngx-toastr';
import { FundTransferService } from '../services/fund-transfer.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
/**
 *@description Fund transfer related Operations done here
 */
export class FundTransferComponent implements OnInit {
  customers: Customer;
  toAcCustomer:Customer;
  minBalance: number = 100;

  benfAccounts:Array<any> = [
    {
    }
  ];
  model:FundTransfer;
 
  custUrl:string=`${environment.serverURL}/customers`
  submitted: boolean;
  frmId: number;
  toId: number;
  /**
   * 
   * @param beneficiaryService 
   * @param toaster 
   * @param fundTranService 
   * @param router 
   */
  constructor(private beneficiaryService:AddBeneficiaryService,private toaster:ToastrService,private fundTranService:FundTransferService,private router:Router,private loginService:LoginService) {
    this.model={
      id:0,
      frmaccount:0,
      toaccount:0,
      amount:0,
      desc:undefined,
      transdate:undefined
    }

   }
  @Output() passData = new EventEmitter();
  fundTransfer:FormGroup;


  ngOnInit(): void {
    this.getBenficiaryData();
  }
/**
 * @function getBenficiaryData
 * @description this function get all the beneficiary accounts from beneficiary table which is already added prev's
 */
  getBenficiaryData=()=>{
    //let logincustomer:Customer=JSON.parse(sessionStorage.getItem("logincustomer"));
   // this.customers=logincustomer;
    //let frmAccount=this.customers.accountNo;
    //assigned from account Number
   // this.model.frmaccount = this.customers.accountNo;
    //console.log("this.customers.accountNo: "+this.customers.accountNo);
    this.loginService.getData(`${this.custUrl}`, sessionStorage.getItem("email"))
    .subscribe((response: Customer) => {
    this.customers=response;
    
    this.model.frmaccount=this.customers[0].accountNo;
    this.benfAccounts = this.customers[0].benificiary;
    console.log("this.benfAccounts: "+this.benfAccounts);
    console.log(""+this.benfAccounts.length);
    for (let i = 0; i < this.benfAccounts.length; i++) {
      this.fundTranService.getData(`${this.custUrl}`, this.benfAccounts[i])
        .subscribe((response: Customer) => {
          this.benfAccounts.push(response[0]);
        },
          (error) => {
            this.toaster.error("Data Loading Failed! Please check Your Connections");
          }
          );
    }
  },
  (error) => {
    this.toaster.error("Get Data Failed! Please check Your Connections");
  });
}

/**
 * @function fundTranSumbit
 * @description When click on fundTransfer Button execute thi function. 
 * FundTransfer data will come and send it to back-end server
 * 
 */
  fundTranSumbit = (onTransfer,toaccount) =>{ 
  this.submitted = true;
  /**
   * @description Below condition checks at least Rs. 1 Required for transferring. or else reject transfer and give error message
   */
  if(onTransfer.controls.amount.value<1) {
     this.toaster.error("Minimum Rs.1 Required");
    return;
   }
   /**
    * @description Below condition checks All form validations are true or false If true then allow to transfer
    */
   debugger;
  if(onTransfer.valid){
      const amount = onTransfer.controls.amount.value;
      const desc = onTransfer.controls.desc.value;
      const toAcCustomerObj=toaccount.value;
      this.onFundtrans(this.customers[0],toAcCustomerObj,amount,desc);
      
     }else{
      this.toaster.warning("Please Enter Valid Data ! "); 
     }
 }
 /**
  * @function onFundtrans
  * @description This function allows all validation has been done then only enter This function to be transfer theire amount.
  */
  onFundtrans=(customerObj,toAcCustomerObj,amount,desc)=>{
    if (customerObj.balance - amount < this.minBalance) {
      this.toaster.error(`Dear Customer, Minimum Balance should be :Rs.${this.minBalance}`)
      return;
    }
    if (customerObj.balance < amount) {
      this.toaster.error(`Insufficiant Balance. You have only Rs.${customerObj.balance} in your account.`);
      return;
    }
    else {
    /**
     * @description Below logic debited from 'FromAccount
     */
    let frmUpdatedBalance = customerObj.balance - amount;
    customerObj.balance = frmUpdatedBalance;
    this.frmId = customerObj.id;

     /**
     * @description Below logic Credited from 'To Account
     */
    let toUpdatedBalance = toAcCustomerObj.balance + amount;
    toAcCustomerObj.balance = toUpdatedBalance;
    this.toId = toAcCustomerObj.id;
  }

    this.fundTranService.updateData(`${this.custUrl}/${this.frmId}`,customerObj)
    .subscribe((response:Customer)=>{
    if(response!==null){
    this.fundTranService.updateData(`${this.custUrl}/${this.toId}`,toAcCustomerObj)
    .subscribe((response:Customer)=>{
    if(response!=null){
    const postObj={frmaccount:customerObj.accountNo,toaccount:toAcCustomerObj.accountNo,description:desc,amount:amount,transdate:new Date()};
    this.fundTranService.addData(`${environment.serverURL}/transhistory`,postObj)
    .subscribe((response:FundTransfer)=>{
    if(response!=null){
                    this.toaster.success(`Fund Transfer Succussfully`,"Fund Transfer Message",{
                    timeOut: 3000,
                    progressAnimation:"increasing",
                    positionClass:"toast-top-right"
                   });
                   this.router.navigate(['/home']); 
                   }
                },
                (error)=>{
                  this.toaster.error("Failed! Some thing went Wrong");
                })
              }
          },
          (error)=>{
            this.toaster.error("Failed! Check Your Connection");
          })
      }

       console.log("Done!!!");
    },
    (error)=>{
        this.toaster.error("Failed! Check Your Connection");
    })


  }

}
