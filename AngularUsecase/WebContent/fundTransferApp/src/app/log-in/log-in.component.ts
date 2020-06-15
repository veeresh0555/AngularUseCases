import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
/**
 * @description Customer able to Login with help of this component
 */
export class LogInComponent implements OnInit {
  userAdded:boolean=false;
  submitted:boolean = false;
  response:number;
  baseUrl:string=`${environment.serverURL}/customers`;
  
  model:any={
    email:'',
    password:''
  }

  login:boolean=true;
  signup:boolean=false;
  loginSuccess = false;

  params:any={
    email:this.model.email,
    password:this.model.password
  }
  
/**
 * 
 * @param loginService 
 * @param toast 
 * @param route 
 */
  constructor(private loginService:LoginService,private toast: ToastrService,private route:Router) { }

  ngOnInit(): void {
  }
/**
 * @description When customer click Login Button then validation checks here If true then proceed or else giving Error Message
 */
  submit = (loginRef) =>
  {
    this.submitted = true;
    if(loginRef.valid)
      {
          console.log("validation Succuss");
          console.log(loginRef);
         this.loginUser();
      }
  }

  /**
  * @description Login User Using This method. This function is validate users
  */
  loginUser=()=>{
    this.loginService.validateLogin(this.baseUrl,this.model.email,this.model.password)//loginService
    .subscribe((response:Array<any>)=>{
      sessionStorage.setItem("email",this.model.email);
      console.log(this.baseUrl +" "+this.model.email+" "+this.model.password);
      console.log(response);
      let resp =response.length;
      console.log(resp);
      if(resp===1){
         this.loginSuccess = true;
         this.toast.success(`Logging In Success! Email: ${this.model.email}`,"Login title",{
          timeOut: 3000,
          progressAnimation:"increasing",
          positionClass:"toast-top-right"

         });
         this.route.navigate(['/home']);   
      }else{      
          this.toast.error("Invalid Credentials","Login Failed");
          }

    },
    (error)=>{
      this.toast.error("Server Error ! Please Start your Back-End Server","Login Failed");
    })
  }

}
