import { CPDemo } from './../../../shared/models/c-p-demo';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../../shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/shared/models/products';
import { AuthService } from 'src/app/shared/services/auth.service';
import {MessageService} from 'primeng/api';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product:Products//getted from url id
  productId:number;//url id
  cartProducts:CPDemo[];
  QuantityToOrder=0;

  //user logged in
  user:Customer
  //id to save on local storage
  id:string

  constructor(private prodServ :ProductsService,
              private route: ActivatedRoute,
              private auth:AuthService,
              private messageService: MessageService,
              private router:Router,
              private cs:CustomerService
    ) { }


  async ngOnInit(){
    if(this.auth.isAuthenticated()){
      this.user=await this.cs.getCustomer();
      this.id=this.user.id.toString();

    }
    this.productId = Number(this.route.snapshot.paramMap.get('Id'));
    console.log(this.productId)
    this. product=await this.prodServ.getSingleItem(this.productId)
  }

  productPlus(id: number) {
    if (this.QuantityToOrder<=this.product.stockQuanitity) {
      this.QuantityToOrder++;

    }

  }


  productMinus(id: number) {
    if (this.QuantityToOrder>1) {
      this.QuantityToOrder--;

    }

  }
  async createObjOfCart(id: number): Promise < CPDemo > {
    var item = await this.prodServ.getSingleItem(id);
    var newitem = {
      product: item,
      quantityToOrder: this.QuantityToOrder
    }
    return newitem

  }
  async addToCart(id: string) {

    if (this.auth.isAuthenticated()) {
      //Check if the user logged in !
      // add to Cart Code .....
      debugger
      var itemToAdd: CPDemo = await this.createObjOfCart(parseInt(id));
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
        this.cartProducts[result].quantityToOrder+=this.QuantityToOrder;
        console.log(this.cartProducts[result].quantityToOrder)
      } else {
        this.cartProducts.push(itemToAdd);
      }
      localStorage.setItem(this.id, JSON.stringify(this.cartProducts))
      // console.log(this.cartProducts)
      this.messageService.add({key: 'tc', severity:'success', summary: 'Success', detail: 'item added to cart '});
      await window.location.reload();

    } else {
      //if not logged in navigate to login page
      // login befor add to cart ....
      //debugger
      this.messageService.clear();
      this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Your are not logged in !', detail:'do you want to login page ?'});
    }
  }
  onReject() {
    this.messageService.clear('c');
    this.messageService.add({severity:'error', summary: 'Error', detail: 'sorry you cant add items to cart you have to login first !', sticky: true});
}
onConfirm() {
  this.messageService.clear('c');
  this.router.navigate(['./login'])
}

}
