import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FundTransfer } from '../models/fund-transfer.model';
import { FundTransferService } from '../services/fund-transfer.service';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mini-statement',
  templateUrl: './mini-statement.component.html',
  styleUrls: ['./mini-statement.component.css']
})
/**
 * @description This component displays all the transactions
 */
export class MiniStatementComponent implements OnInit {
  
  transData: FundTransfer;
  customers: Customer;
  /**
   * 
   * @param fundtransfer 
   * @param toaster 
   * @param router 
   */
  constructor(private fundtransfer:FundTransferService,private toaster:ToastrService,private router:Router) {
  
  }
  /**
   * 
   * @param sort 
   * description below function Goes to sort an elements to the table
   */
  sortData(sort: Sort) {
    const data = this.transData;
    if (!sort.active || sort.direction === '') {
      this.transData = data;
      return;
    }
  }

  ngOnInit() {
    this.getTransDataByAc();
    }

  /**
   * @description Below function get All transaction records based on Account Number
   */
  getTransDataByAc=()=>{
    let logincustomer:Customer=JSON.parse(sessionStorage.getItem("logincustomer"));
    this.customers=logincustomer;
    let frmAccount=this.customers.accountNo;
       this.fundtransfer.getData(`${environment.serverURL}/transhistory`, frmAccount)
        .subscribe((response: FundTransfer) => {
        this.transData=response;
        console.log("TransData: "+this.transData);
        },
          (error) => {
            this.toaster.error("Sorry! Operation Failed, Please check Your Connection");
          });
  }
/**
 * @description this function go to Dashboard
 */
  back=()=>{
    this.router.navigate(['/home']);;
  }



}
