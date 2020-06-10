import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import {FormGroup,FormControl, Validators, AbstractControl, FormBuilder  } from '@angular/forms';
import { ReguserService } from 'src/app/services/user/reguser.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  @Output() passData = new EventEmitter();
  registerForm:FormGroup;
  submitted:boolean =false;
  user :any = {
    firstName:'',
    mobileNumber:'',
    address:'',
    email:'',
    password:''
  }

  baseUrl:string=`${environment.serverURL}/users`;
  pattern:string ="[A-Za-z0-9._%+-]*(@ddd.com|@ppp.com)";
  passwordPattern:string= "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@&]).{8,12}$";
  mobileNumberPattern:string= "^(\\+91)[0-9]{10}$";
  
  
  constructor(private regUserService:ReguserService,private route:Router,private toast:ToastrService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl('',[Validators.required,Validators.minLength(3)]),
        email: new FormControl('',[Validators.required, Validators.pattern(this.pattern)]),
        mobileNumber: new FormControl('',[Validators.required,Validators.pattern(this.mobileNumberPattern)]),
        address: new FormControl('',[Validators.required,Validators.maxLength(100)]),
        password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(12),Validators.pattern(this.passwordPattern)]),
        confirmPassword: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(12)])
      }
    )



  }

  /**
  * @description This method validates the form, and upon successful validation registers an user
  */
 submit=()=>
 {
   this.submitted = true;
   if(this.registerForm.valid)
   {
     this.user = {firstName:this.registerForm.controls.firstName.value,email:this.registerForm.controls.email.value,
       mobileNumber:this.registerForm.controls.mobileNumber.value,address:this.registerForm.controls.address.value,password:this.registerForm.controls.password.value};
     this.addUser(this.user);
   }
 }

  /**
 * @description This method registers an user
 * @param user
 */
 addUser=(user)=>
 {
   this.regUserService.addData(`${this.baseUrl}`,user).subscribe((response)=>{
     console.log(response);   
     this.passData.emit(true);
     this.route.navigate(['/login']);    
     this.toast.success("User Registration Succussfully"); 
   },
   (error)=>{
     console.log(error);
   },
   ()=>{

   })
 }



}



