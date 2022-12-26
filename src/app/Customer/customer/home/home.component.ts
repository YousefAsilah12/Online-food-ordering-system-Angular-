import { CategorieService } from './../../../shared/services/categorie.service';
import { Categories } from './../../../shared/models/categories';
import { ProductsService } from './../../../shared/services/products.service';
import { Router } from '@angular/router';
import { Products } from './../../../shared/models/products';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CPDemo } from 'src/app/shared/models/c-p-demo';
import { Customer } from 'src/app/shared/models/customer';
import { CustomerService } from 'src/app/shared/services/customer.service';
import {MessageService} from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {
  PrimeNGConfig
} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Products[];
  public categories: Categories[];
  id :string;
  public User:Customer;
  cartProducts: CPDemo[] = [];

	responsiveOptions;

  travel(id:number){
    this.catService.catSelected=id;
    this.router.navigate(['./Customer/products'])

  }
  constructor(private appHttp: ProductsService,
    private router:Router,
    private auth: AuthService,
    private CS:CustomerService,
    private prodservice:ProductsService,
    private catService:CategorieService,
    private messageService: MessageService,
    ) {
      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];



   }
   onConfirm() {
    this.messageService.clear('c');
    this.router.navigate(['./login'])
}

onReject() {
    this.messageService.clear('c');
    this.messageService.add({severity:'error', summary: 'Error', detail: 'sorry you cant add items to cart you have to login first !', sticky: true});

}
clear() {
  this.messageService.clear();
}
showSticky() {
  this.messageService.add({severity:'info', summary: 'Sticky', detail: 'Message Content', sticky: true});
}



   async addToCart(id: number) {
    if (this.auth.isAuthenticated()) {
      //Check if the user logged in !
      // add to Cart Code .....
      debugger
      var itemToAdd: CPDemo = await this.createObjOfCart(id);
      //...z
      if(localStorage.getItem(this.id)==null){
        this.cartProducts.push(itemToAdd);
        localStorage.setItem(this.id, JSON.stringify(this.cartProducts))
        return;
      }
      this.cartProducts = JSON.parse(localStorage.getItem(this.id));
      var result = this.cartProducts.findIndex(x => x.product.id == itemToAdd.product.id);
      console.log(result)
      if (result != -1 && this.cartProducts != null) {
        this.cartProducts[result].quantityToOrder++;
        console.log(this.cartProducts[result].quantityToOrder)
      } else {
        this.cartProducts.push(itemToAdd);
      }
      localStorage.setItem(this.id, JSON.stringify(this.cartProducts))
      // console.log(this.cartProducts)
      this.messageService.add({key: 'tc', severity:'success', summary: 'Success', detail: 'item added to cart '});

    } else {
      //if not logged in navigate to login page
      // login befor add to cart ....
      debugger
      this.messageService.clear();
      this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Your are not logged in !', detail:'do you want to login page ?'});
    }
  }
  async createObjOfCart(id: number): Promise < CPDemo > {
    var item = await this.getProdById(id);
    var newitem = {
      product: item,
      quantityToOrder: 1
    }
    return newitem;

  }
  async getProdById(id: number) {
    return await this.prodservice.getSingleItem(id);
  }


   async ngOnInit() {

     this.products= await this.prodservice.getAll();
     this.categories=await this.catService.getAll();
     if(this.auth.isAuthenticated()){
      this.User=await this.CS.getCustomer();
      this.id=this.User.id.toString();
    }



    }}
