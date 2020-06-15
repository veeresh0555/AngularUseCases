import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/**
 *@ 
 */
export class HeaderComponent implements OnInit {
  loginSuccess: boolean=false;
  loginuser: string;

  /**
   * 
   * @param toast 
   * @param route 
   */
  constructor(private toast:ToastrService,private route:Router) { 
    let loginuser=sessionStorage.getItem("loginuser");
    if(loginuser !==null ){
      console.log("Enter session header if condition....");
      this.toast.success(`Logging In Success! Customer: ${loginuser}`,"Log In",{
         timeOut: 3000,
          positionClass:"toast-top-right",
          
      });
      this.loginSuccess = true;
      this.loginuser=loginuser;
    }

  }

  ngOnInit(): void {
  }

  /**
   * @description Logout Function perform remove all session Objects and navigate to the Out of the session
   */
  logout=()=>{
    sessionStorage.clear();
    this.toast.error("LogOut SuccussFully");
    this.route.navigate(['/login']);
    console.log("sessionStorage After clear::: "+sessionStorage.getItem("email")+" Login User: "+sessionStorage.getItem("loginuser"));
  }


}
