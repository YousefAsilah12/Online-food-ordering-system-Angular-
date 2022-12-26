import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SideBarAdminComponent } from './side-bar-admin/side-bar-admin.component';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { NavBarSlimComponent } from './nav-bar-slim/nav-bar-slim.component';
import {SidebarModule} from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { SuppliersComponent } from './suppliers/suppliers.component';



import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EmployeesComponent } from './employees/employees.component';
import {InputMaskModule} from 'primeng/inputmask';
import {KnobModule} from 'primeng/knob';
import {CarouselModule} from 'primeng/carousel';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, AdminLayoutComponent ,UsersComponent, SideBarAdminComponent, AdminNavBarComponent, NavBarSlimComponent, OrdersComponent, ProductsComponent, CategoriesComponent, SuppliersComponent, EmployeesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    InputMaskModule,
    KnobModule,
    CarouselModule
  ],
  bootstrap:    [ AppComponent ],
  providers: [MessageService, ConfirmationService]

})
export class AdminModule { }
