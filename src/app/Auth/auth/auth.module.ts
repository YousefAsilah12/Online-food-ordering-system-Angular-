import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { RegLayoutComponent } from './reg-layout/reg-layout.component';
import { EmployeeRegComponent } from './employee-reg/employee-reg.component';
import { CustomerRegComponent } from './customer-reg/customer-reg.component';
import { RouterModule } from '@angular/router';
import { RegAndLoginComponent } from './reg-and-login/reg-and-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {StepsModule} from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import {CardModule} from 'primeng/card';
import { PasswordChangedComponent } from './password-changed/password-changed.component';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [LoginComponent,RegisterComponent, RegLayoutComponent, EmployeeRegComponent, CustomerRegComponent, RegAndLoginComponent, AdminLoginComponent, ForgotPasswordComponent, PasswordChangedComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    DropdownModule,
    ConfirmPopupModule,
    RouterModule,
    StepsModule,
    ToastModule,
    CardModule,
    CalendarModule

  ],
  exports:[LoginComponent,RegisterComponent]
})
export class AuthModule { }
