import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/service/api/data.service';
import { environment } from 'src/environments/environment';
import {FormGroup,FormControl, Validators, AbstractControl, FormBuilder  } from '@angular/forms';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveFormComponent implements OnInit {

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
  baseUrl:string=`${environment.baseUrl}/users`;
  pattern:string ="[A-Za-z0-9._%+-]*(@ddd.com|@ppp.com)";
  passwordPattern:string= "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@&]).{8,12}$";
  mobileNumberPattern:string= "^(\\+91)[0-9]{10}$";
  

  constructor(private dataService:DataService) { }


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
      // console.log("First Name:"+this.registerForm.controls.firstName.value);

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
    this.dataService.addData(`${this.baseUrl}`,user).subscribe((response)=>{
      console.log(response);   
      this.passData.emit(true);
    //this.userAdded = true;
      alert("User added successfully")   
    },
    (error)=>{
      console.log(error);
    },
    ()=>{

    })
  }



}
