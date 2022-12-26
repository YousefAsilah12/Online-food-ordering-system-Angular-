import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from './../../../shared/models/customer';
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import * as moment from 'moment';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
interface City {
  name: string
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
email;
  position: string;
  public customer:Customer;
  submitted: boolean;
  customerDialog: boolean;
  ForgotPassDialog:boolean
  img: any;
  cities:City[];
  date6
  selectedCity
  message: string;
  constructor(public Customerserv:CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private AuthService:AuthService,

              public router:Router) { }

  async ngOnInit() {
    this.email=null
    this.customer=await this.Customerserv.getCustomer();
    this.cities = [
      {name: 'New York'},
      {name: 'Rome'},
      {name: 'London'},
      {name: 'Istanbul'},
      {name: 'Paris'}
  ];

  }
  HandleFiles(event:any)
  {
    console.log(event)
    if (event.target.files!== event.target.files.length >0) {
      this.img=event.target.files[0];
      const reader=new FileReader();
      reader.onload=function(e){
        $('#image').attr('src',e.target.result as string);
      }
      reader.readAsDataURL(this.img)
    }else{
      this.img=null;
     // $('#image').attr('src',e.target.result);

    }
  }


  openEdit(){
    debugger
    this.img=null
    this.submitted = false;
    this.customerDialog = true;
  }
  hideEditDialog(){
    this.img=null
    this.customerDialog=false;
    this.submitted = false;

  }

  openForgotPass(){
    this.email=null
    this.ForgotPassDialog = true;
    this.submitted = true;
  }
  hideForgotPass(){
    this.email=null
    this.ForgotPassDialog=false;
    this.submitted = false;
  }


  async updateUser(){
    this.submitted = true;
    debugger
    const fd = new FormData();
    let formattedDate = (moment(this.date6)).format('DD-MMM-YYYY HH:mm:ss')
    console.log('formattedDate '+formattedDate)
    if (this.customer.id) {
    fd.append('id',this.customer.id.toString());
    fd.append('firstName',this.customer.firstName);
    fd.append('lastName',this.customer.lastName);
    fd.append('password',this.customer.password);
    fd.append('birthdate',formattedDate);
    fd.append('phone',this.customer.phone);
    fd.append('email',this.customer.email);
    fd.append('homeNo',this.customer.homeNo.toString());
    fd.append('street',this.customer.street);
    fd.append('city',this.customer.city);
    fd.append('image',this.img);
    fd.append('imageNotChanged',this.customer.image);
     (await this.Customerserv.PutCus3(fd)).subscribe(async Emp=>{
      this.message='user have benn updated ! '
      this.hideEditDialog()
      this.Customerserv.getCustomer();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Customer Updated',
        life: 3000
      });
    },ex=>{
      console.log(ex)
      this.message=null
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: ex.error,
        life: 3000
      });
    }
    )

    }
    else{
      alert('user not found')
    }
  }

  ChangePassword(){

  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to change Paasasword?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            this.openForgotPass();
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                    this.hideForgotPass();
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                    this.confirmationService.close();
                break;
            }
        }
    });
}

  async changePass(){
if (this.email!=null&&this.email==this.customer.email) {
    await (await this.AuthService.CustomerForgetPassword(this.email)).subscribe(user=>{
    this.messageService.add({severity:'success', summary: 'Success', detail: ' New Password Sent ,check your email '});
      this.hideForgotPass();
      this.AuthService.doLogout()
},ex=>{
    console.log(ex.error)
    this.messageService.add({ severity:'error', summary: 'Error', detail: this.email+"  ,  "+ ex.error +" make Sure to type correct email address "});
    this.message=null
    this.hideForgotPass();
    this.AuthService.doLogout()
  }
  )
}
else{
  this.messageService.add({severity:'error', summary:'Rejected', detail:'email not currect'});
}
}


}
