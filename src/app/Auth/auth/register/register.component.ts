import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from './../../../shared/models/customer';
import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import * as $ from "jquery";
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
interface City {
  name: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class RegisterComponent implements OnInit {


  formGroup:FormGroup;


  base="https://localhost:44318/api/Customers/";

customer:Customer={};
img
date:Date
cities:City[];
selectedCity;
email

  //to change template
  templateChange="home";
  tempbool=true;
  tt:string='true'
  message: string;
   constructor(
     private confirmationService: ConfirmationService,
     private messageService: MessageService,
                private CustomerService:CustomerService,
                private Router:Router
                ,private http:HttpClient) {

                  this.cities = [
                    {name: 'New York'},
                    {name: 'Rome'},
                    {name: 'London'},
                    {name: 'Istanbul'},
                    {name: 'Paris'}
                ];
                      this.img=null


  }

   loginProces(){

   }

   initForm(): void {
    this.formGroup=new FormGroup({
      firstName: new FormControl (  '',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      lastName: new FormControl('',[(Validators.required, Validators.pattern('^[a-zA-Z \-\']+'))]),
      email:new FormControl('',[Validators.required,Validators.email,Validators.minLength(5)]),
      password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(16),this.isValidPassword]),
      birthDate:new FormControl('',[Validators.required]),
      phone:new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')] ),
      homeNo:new FormControl('',[Validators.required,Validators.minLength(1)]),
      street:new FormControl('',[Validators.required,Validators.minLength(2)]),
      city:new FormControl('',[Validators.required]),

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

   change(data :string){
     if(data=='profile'){
      this.templateChange='profile';
      this.tempbool=true;
     }else{
       this.templateChange='home';
       this.tempbool=false;

     }

   }
  ngOnInit(): void {
    this.initForm();
    this.change(this.templateChange);
  }
//   async confirm(event: Event) {
//     this.confirmationService.confirm({
//         target: event.target,
//         message: 'to continue to login ?',
//         icon: 'pi pi-user-plus',
//         accept: () => {
//          //  var res:Customer=this.makeCustomer();
//           if (res) {
//              var result=this.CustomerService.postuser(res);
//              if (result) {
//               console.log(result)
//               this.Router.navigate(['/login'])

//              }
//              else{
//                alert('wrong!')
//              }
//           }
//         },
//         reject: () => {
//           this.Router.navigate(['/login/register']);
//           alert("try again ")
//         }
//     });
// }

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

  async RegisterProcess(){
debugger
    if (this.img==null) {
      alert('select img')
    }
    let formattedDate = (moment(this.formGroup.value['birthDate'])).format('DD-MMM-YYYY HH:mm:ss')
    console.log('formattedDate '+formattedDate)

    const fd = new FormData();
    fd.append('firstName',this.formGroup.value['firstName']);
    fd.append('lastName',this.formGroup.value['lastName']);
    fd.append('password',this.formGroup.value['password']);
    fd.append('birthdate',formattedDate);
    fd.append('phone',this.formGroup.value['phone']);
    fd.append('email',this.formGroup.value['email']);
    fd.append('homeNo',this.formGroup.value['homeNo']);
    fd.append('street',this.formGroup.value['street']);
    fd.append('city',this.formGroup.value['city'].name);
    fd.append('image',this.img);

  console.log(this.formGroup)
  if (this.formGroup.valid) {
          try {
           await (await this.CustomerService.postuser2(fd)).subscribe(async Emp=>{
            this.message='user have benn Created ! '
            this.Router.navigate(['./login'])
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Customer created',
              life: 6000
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
          } catch (error) {
            console.log(error)
          }}


  }





}
