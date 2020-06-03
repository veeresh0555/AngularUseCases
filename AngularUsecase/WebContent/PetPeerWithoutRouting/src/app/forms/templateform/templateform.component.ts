import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/service/api/data.service';
import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-template-form',
  templateUrl: './templateform.component.html',
  styleUrls: ['./templateform.component.css']
})
export class TemplateFormComponent implements OnInit {

  userAdded:boolean=false;
  submitted:boolean = false;
  baseUrl:string=`${environment.baseUrl}/users`;
  petsBaseUrl:string=`${environment.baseUrl}/pets`;

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

  constructor(private dataService:DataService) { }

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
  * @description When login button clicked, this method validates user login
  */
  loginUser=()=>
  {
    this.dataService.validateLogin(this.baseUrl,this.model.email,this.model.password)
    .subscribe((response)=>{
      sessionStorage.setItem("email",this.model.email);
      console.log(this.baseUrl +" "+this.model.email+" "+this.model.password);
      console.log(response);
     
          this.loginSuccess = true;
      

    },
    (error)=>{
      console.log(error);
    },
    ()=>{

    })
  }

   /**
  *@description  When login button clicked, this method displays login section
  */
  loginClicked()
  {
    this.login = true;
    this.signup =false;
  }

  /**
  * @description When signup button clicked, this method displays register section
  */
  signupClicked()
  {
    this.login=false;
    this.signup =true;
  }

}
