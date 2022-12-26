import { CustomerDto } from './../../../shared/Dto/customer-dto';
import { Password } from 'primeng/password';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/shared/models/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',]
})
export class LoginComponent implements OnInit {

  formGroup:FormGroup;
  sentUser_1:Auth;
  user:any;


  // public email:string;
  // public password:string;


  constructor( private router:Router,
               private auth:AuthService,
               private http:HttpClient,
               private cus:CustomerService,

               ) {
               }


ngOnInit(){
  this.initForm();

}


  initForm(): void {
    this.formGroup=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email,Validators.minLength(5)]),
      password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(16),this.isValidPassword]),
    });

  }

  isValidPassword(control:AbstractControl){

    if(control.value){
      const regex=/^[A-Z]/
      if (!regex.test(control.value)) {
        return {invalidPassword:true}

      }
    }
  }

  async loginProces(){
    debugger
    console.log(this.formGroup)
    if (this.formGroup.valid) {
      // login
      sessionStorage.clear();
      this.auth.IsLogged_in==false;
            try {
              let res=  await this.auth.doLogin(this.formGroup.value)
              sessionStorage.setItem('Token',res);
              this.auth.IsLogged_in=true;
              this.router.navigate(['/Customer/home']).then(() => {
      window.location.reload();
    });
            } catch (error) {
              this.auth.IsLogged_in=false;
              localStorage.setItem('IsLogged_in',String(this.auth.IsLogged_in))
              console.log('not found');
              alert("user not found ! ")
            }}


    }

    }








