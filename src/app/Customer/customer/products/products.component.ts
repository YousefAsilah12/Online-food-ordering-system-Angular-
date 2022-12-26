import {
  CPDemo
} from './../../../shared/models/c-p-demo';
import {
  Router
} from '@angular/router';
import {
  CategorieService
} from './../../../shared/services/categorie.service';
import {
  ProductsService
} from './../../../shared/services/products.service';
import {
  Products
} from './../../../shared/models/products';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  SelectItem
} from 'primeng/api';
import {
  PrimeNGConfig
} from 'primeng/api';
import {
  Categories
} from 'src/app/shared/models/categories';
import {
  AuthService
} from 'src/app/shared/services/auth.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {MessageService} from 'primeng/api';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {



  public products: Products[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;

  category: Categories;
  catId: number;



  cartProducts: CPDemo[] = [];
  cartCounter: number = 0;

  //user id ...
  public User:Customer;
  //id string to save to localstorage
  id :string;
  constructor(private primengConfig: PrimeNGConfig,
    private prodService: ProductsService,
    private catservice: CategorieService,
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService,
    private CS:CustomerService) {}


  async ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.User=await this.CS.getCustomer();
      this.id=this.User.id.toString();
    }
    console.log("CAT IS "+this.catId)
    console.log("CATsELECTED "+this.catservice.catSelected)

    this.catId = this.catservice.catSelected
    try {
      this.category = await this.catservice.getSingleItem(this.catId)

      await this.prodService.getProductsNyCategoryId(this.catId).then(data => this.products = data);

    } catch (error) {
      this.router.navigate(['./Customer/Categories'])
    }

    this.sortOptions = [{
        label: 'Price High to Low',
        value: '!productPrice'
      },
      {
        label: 'Price Low to High',
        value: 'productPrice'
      }
    ];
    this.primengConfig.ripple = true;


  }

  async getProdById(id: number) {
    return await this.prodService.getSingleItem(id);
  }

  async createObjOfCart(id: number): Promise < CPDemo > {
    var item = await this.getProdById(id);
    var newitem = {
      product: item,
      quantityToOrder: 1
    }
    return newitem;

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

  showSticky() {
    this.messageService.add({severity:'info', summary: 'Sticky', detail: 'Message Content', sticky: true});
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
  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }

  }
}
