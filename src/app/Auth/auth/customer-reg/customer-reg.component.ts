import { Password } from 'primeng/password';
import { CustomerDto } from './../../../shared/Dto/customer-dto';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-customer-reg',
  templateUrl: './customer-reg.component.html',
  styleUrls: ['./customer-reg.component.css']
})
export class CustomerRegComponent implements OnInit {
  cities: City[];
  formGroup:FormGroup;
  selectedCity1;

  cityLabel="city";


  PasswordConfirm:string;

  constructor(private auth:AuthService,
              private CS:CustomerService,
              private router:Router) {
    this.cities=[
      {name: 'Jerusalem', code: 'JM'},
      {name: 'BeitHanina', code: 'BH'},
   ];

   }

   deleteLabel(){
    //  const lblCity :HTMLElement =document.getElementById('lblCity');
    //  lblCity.innerHTML='';
    //  lblCity.innerText="";
    this.cityLabel="";
   }
  ngOnInit(): void {
  this.initForm();
  }

  initForm(): void {
    this.formGroup=new FormGroup({
      firstName: new FormControl (  '',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      lastName: new FormControl('',[(Validators.required, Validators.pattern('^[a-zA-Z \-\']+'))]),
      email:new FormControl('',[Validators.required,Validators.email,Validators.minLength(5)]),
      password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(16),this.isValidPassword]),
      ConfirmPassword:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(16),this.isValidPassword]),
      birthdate:new FormControl('',[Validators.required]),
      phone:new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')] ),
      homeNo:new FormControl('',[Validators.required,Validators.minLength(1)]),
      street:new FormControl('',[Validators.required,Validators.minLength(2)]),
      city:new FormControl('',[Validators.required]),

    });
  }
  // changeCityName(item:string){
  //   this.selectedCity1=item;

  // }
  createObj(){
    debugger
    const s =new CustomerDto();
    s.firstName=this.formGroup.value['firstName'];
    s.lastName=this.formGroup.value['lastName'];
    s.password=this.formGroup.value['password'];
    s.image='https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png'
    s.birthdate=this.formGroup.value['birthdate'];
    s.birthdate=new Date(s.birthdate);
    console.log(s.birthdate)
    s.phone=this.formGroup.value['phone'];
    s.email=this.formGroup.value['email'];
    s.homeNo=this.formGroup.value['homeNo'];
    s.street=this.formGroup.value['street'];
    s.city=this.formGroup.value['city'];
    console.log(s)
    return s ;


        // var a = moment(s.birthdate);
    // var b = a.add();
    // s.birthdate=new Date(a.format());
    // console.log(s.birthdate)

  }
  //check if first character is captil letter
  isValidPassword(control:AbstractControl){

    if(control.value){
      const regex=/^[A-Z]/
      if (!regex.test(control.value)) {
        return {invalidPassword:true}

      }
    }
  }

 async PostUser(){
   console.log(this.formGroup)
   debugger
    if(this.formGroup.valid){
      try {
        debugger
        var s =this.createObj();
        let res=  await this.CS.postuser(s);
        console.log("Your account Created ! now you can loggin ")
          this.router.navigate(['/login']).then(() => {
            window.location.reload()});

      } catch (error) {
        alert("register field , you have to fill missed input try again later ! ")
      }}


  }

}
