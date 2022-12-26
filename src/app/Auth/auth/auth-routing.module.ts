import { PasswordChangedComponent } from './password-changed/password-changed.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegAndLoginComponent } from './reg-and-login/reg-and-login.component';
import { CustomerRegComponent } from './customer-reg/customer-reg.component';
import { EmployeeRegComponent } from './employee-reg/employee-reg.component';
import { RegLayoutComponent } from './reg-layout/reg-layout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {path:'forgotPassword',
  component:ForgotPasswordComponent
 }
,


  {path:'regAndLogin',component:RegAndLoginComponent},

  {path:'AdminLogin',component:AdminLoginComponent},
{path:'PasswordChanged',component:PasswordChangedComponent},
  {
  path:'register',
    component:RegisterComponent,
},


]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
