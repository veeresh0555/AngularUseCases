import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/user/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userAdded:boolean=false;
  submitted:boolean = false;
  response:number;
  baseUrl:string=`${environment.serverURL}/users`;
  
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
  

  constructor(private loginService:LoginService,private toast: ToastrService,private route:Router) { }

  ngOnInit(): void {
  }

  submit = (loginRef) =>
  {
    this.submitted = true;
    if(loginRef.valid)
      {
          console.log("Form Validation successful");
          console.log(loginRef);
         this.loginUser();
      }
  }

  /**
  * @description Login User Using This method. This function is validate users
  */
  loginUser=()=>
  {
    this.loginService.validateLogin(this.baseUrl,this.model.email,this.model.password)//loginService
    .subscribe((response:Array<any>)=>{
      sessionStorage.setItem("email",this.model.email);
      console.log(this.baseUrl +" "+this.model.email+" "+this.model.password);
      console.log(response);
      let resp =response.length;
      console.log(resp);
      if(resp===1){
         this.loginSuccess = true;
         this.toast.success("Logging In Success! Email: "+this.model.email);
         this.route.navigate(['/products']);   
      }else{      
          this.toast.error("Invalid Credentials");
          }

    },
    (error)=>{
      console.log(error);
    },
    ()=>{

    })
  }

}
