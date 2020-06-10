import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  loginSuccess: boolean=false;
  loginuser:string;

  constructor(public cartService: CartService,private toast: ToastrService,private route:Router) {
  }

  ngOnInit() {
    let sesmail=sessionStorage.getItem("email");
    if(sesmail !==null ){
      console.log("Enter session header if condition....");
      this.toast.success("Logging In Success! Email: "+sesmail);
      this.loginSuccess = true;
      this.loginuser=sesmail;
    }

  /**
   * This method calc of cart total count
   * 
   */
  this.cartService.cartTotal$.subscribe(total => {
    this.cartTotal = total;
  });

  this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
  }
  /**
   * Logout() User and clear the session
   */
  logout=()=>{
    sessionStorage.clear();
    this.toast.success("LogOut SuccuessFully");
    this.route.navigate(['/login']);
    console.log("sessionStorage After clear::: "+sessionStorage.getItem("email"));
  }

}