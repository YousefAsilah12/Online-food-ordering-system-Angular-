import { CustomerDto } from './../../../shared/Dto/customer-dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, RequiredValidator, Validators, MaxLengthValidator, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/shared/models/customer';
import { CustomerService } from 'src/app/shared/services/customer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  public user:Customer;

  constructor(public Customerserv:CustomerService,
    public router:Router) { }

  idLoggedIn:number
async ngOnInit() {

  this.user=await this.Customerserv.getCustomer();
  this.idLoggedIn=this.user.id;

}
userForm = new FormGroup({
  firstName: new FormControl (  '',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
  lastName: new FormControl(Validators.required, Validators.pattern('^[a-zA-Z \-\']+')),
  image:new FormControl('',[Validators.required,Validators.minLength(5)]),
  birthdate:new FormControl('',[Validators.required]),
  phone:new FormControl('', [Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')] ),
  email:new FormControl('',[Validators.required,Validators.email,Validators.minLength(5)]),
  homeNo:new FormControl('',[Validators.required,Validators.minLength(1)]),
  stret:new FormControl('',[Validators.required,Validators.minLength(2)]),
  city:new FormControl('',[Validators.required,Validators.minLength(2)])

});


createObk(){
  const s =new CustomerDto();
  s.firstName=this.userForm.value['firstName'];
  s.lastName=this.userForm.value['lastName'];
  s.image=this.userForm.value['image'];
  s.birthdate=this.userForm.value['birthdate'];
  s.phone=this.userForm.value['phone'];
  var a = moment(s.birthdate);
  var b = a.add();
  s.birthdate=new Date(a.format());
  console.log(s.birthdate)
  s.email=this.userForm.value['email'];
  s.homeNo=this.userForm.value['homeNo'];
  s.street=this.userForm.value['stret'];
  s.city=this.userForm.value['city'];
  s.password=this.user.password;
  return s ;
}
async onFormSubmit() {
  debugger
  console.log('value ',this.userForm.controls.firstName.value)

  var a :CustomerDto
  a=this.createObk();
   return await this.Customerserv.PutCustomer( a,this.idLoggedIn);
}


}
