import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { HomeComponent } from './home/home.component';
import { EmployeeLayoutComponent } from './employee-layout/employee-layout.component';


@NgModule({
  declarations: [HomeComponent, EmployeeLayoutComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
