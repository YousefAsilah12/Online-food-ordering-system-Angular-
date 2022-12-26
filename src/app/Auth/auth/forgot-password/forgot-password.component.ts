import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [MessageService]

})
export class ForgotPasswordComponent implements OnInit {

EmailVal
submitted;
  isEmail;
  message: string;
  constructor(
    public messageService: MessageService,private Router :Router,private AuthService:AuthService) {}

  ngOnInit() {
    this.submitted=false;
    this.EmailVal=null
    this.isEmail=false

  }
   validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
 }
  async ss(){
    debugger
    this.submitted=!this.submitted;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if (this.validateEmail(this.EmailVal)) {
    //   this.isEmail=!this.isEmail;
    // }

    console.log('sumbited'+this.submitted)
    console.log('ismail'+this.isEmail)
    const fd = new FormData();
    fd.append('email',this.EmailVal);

      await  (await this.AuthService.CustomerForgetPassword(this.EmailVal)).subscribe(user=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: ' New Password Sent ,check your email '});
     //this.Router.navigate(['login/PasswordChanged'])

    },ex=>{
        console.log(ex.error)
        this.messageService.add({ severity:'error', summary: 'Error', detail: this.EmailVal+"  ,  "+ ex.error +" make Sure to type correct email address "});
        this.message=null
      }
      )

  }
  }

