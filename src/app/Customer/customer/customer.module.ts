import { AuthModule } from './../../Auth/auth/auth.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';

import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';

import {OrderListModule} from 'primeng/orderlist';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

//angular
import {MatDialogModule} from '@angular/material/dialog';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import { CustomerNavBarComponent } from './customer-nav-bar/customer-nav-bar.component';
import { CustomerlayoutComponent } from './customerlayout/customerlayout.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { SideBarLayoutComponent } from './side-bar-layout/side-bar-layout.component';
import {SidebarModule} from 'primeng/sidebar';

import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';


@NgModule({
  declarations: [HomeComponent, CustomerlayoutComponent, CustomerNavBarComponent, CustomerFooterComponent, ProductsComponent, AccountComponent, CartComponent, CategoriesComponent, ProductDetailsComponent, AccountEditComponent, SideBarLayoutComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MessageModule,
    TabMenuModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    RatingModule,
    RippleModule,
    OrderListModule,
    MessagesModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule
    ,MatDialogModule,
    AuthModule,
    SidebarModule,
    CalendarModule,
    InputMaskModule,
  ],
  providers: [ConfirmationService,MessageService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomerModule { }
