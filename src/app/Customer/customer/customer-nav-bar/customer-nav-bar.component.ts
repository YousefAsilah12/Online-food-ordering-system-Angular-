import {  site } from './../../../shared/Data/appData';
import { RegisterComponent } from './../../../Auth/auth/register/register.component';
import { CPDemo } from './../../../shared/models/c-p-demo';
import { Router } from '@angular/router';
import {  OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import {Component} from '@angular/core';
import { Customer } from 'src/app/shared/models/customer';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { LoginComponent } from 'src/app/Auth/auth/login/login.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-customer-nav-bar',
  templateUrl: './customer-nav-bar.component.html',
  styleUrls: ['./customer-nav-bar.component.css']
})
export class CustomerNavBarComponent implements OnInit {
  visibleSidebar2
  items: MenuItem[];

  activeItem: MenuItem;
  user:Customer
  isAuthintecated=false;

  public cartCounter:number=0;
  cartItems: CPDemo[] = [];
  logo


  constructor(private auth:AuthService,
              private  messageService: MessageService,
              private router:Router,
              private CustomerSer:CustomerService,
              public dialog: MatDialog,

              ){

  }
  async ngOnInit() {
  this.logo=site.Logo;
    if (this.auth.isAuthenticated()) {
      this.user=await this.CustomerSer.getCustomer();
      var a =JSON.parse(localStorage.getItem(this.user.id.toString())) ;
      if (a) {
        this.cartItems =a;

      }
      this.checkOrderQuantity();

    }

    this.isAuthintecated=this.auth.isAuthenticated();
      this.items = [
          {label: 'Home', icon: 'pi pi-fw pi-home',routerLink:'./home'},
          {label: 'Categories', icon: 'pi pi-slack',routerLink:'./Categories'},
          {label: 'Account', icon: 'pi pi-fw pi-cog',routerLink:'./Account',visible:this.auth.isAuthenticated()},
          {label: 'Cart', icon: 'pi pi-shopping-cart  '  ,routerLink:'./Cart',visible:this.auth.isAuthenticated(),id:'Cart-1'
          ,styleClass:'menucus' ,style:"font-size: 100px;"}


//,style:"'float':'right'"
      ];

      this.activeItem = this.items[0];
  }

  checkOrderQuantity(){
    var total=0;
    for(var i = 0;i<this.cartItems.length;i++) {
      this.cartCounter+=this.cartItems[i].quantityToOrder;
   }
      return total;
}




  LogOut(){
    this.auth.doLogout();
  }
  LogIn(){

    this.auth.navigateToLogin();
  }
  openDialog() {

    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

