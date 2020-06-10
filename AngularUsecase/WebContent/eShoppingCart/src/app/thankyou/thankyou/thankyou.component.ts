import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  serverURL = environment.serverURL;
  products :any=[];
  constructor(private router: Router,private orderService:OrderService,private toast:ToastrService) {  }

  ngOnInit(): void {
    this.orderList();
  }
/**
 * @description Fetch all order details based on user email
 */
  orderList=()=>{
    let uemail=sessionStorage.getItem("email");
    if(uemail===null){
      this.toast.error("Please Login And Show your Orders");
      this.router.navigate(['/login']);
    }else{
    this.orderService.getAllOrders(`${this.serverURL}/orders`,uemail).subscribe((response)=>{
     console.log("entered")
     console.log(response);
      this.products = response;
      console.log(JSON.stringify(this.products));
    });
  }
  }


  }

