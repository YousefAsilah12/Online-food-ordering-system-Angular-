import { Products, ordersProducts } from './../../../shared/models/products';
import { element } from 'protractor';
import { CartService } from './../../../shared/services/cart.service';
import { Cart } from './../../../shared/models/cart';
import { CustomerProductsService } from './../../../shared/services/customer-products.service';
import { OrderService } from './../../../shared/services/order.service';
import { Router } from '@angular/router';
import {
  CPDemo
} from './../../../shared/models/c-p-demo';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  PrimeNGConfig
} from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Message} from 'primeng/api';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from 'src/app/shared/models/customer';

import {render} from'creditcardpayments/creditCardPayments';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


//for Paypal :
@ViewChild('paypalRef',{static:true})
private paypalRef:ElementRef
  msgs: Message[] = [];

  products: CPDemo[];
  cartproduct: CPDemo[];

  //user logged in
  user:Customer
  //id for saving to local storage
  id :string

  totalPrice:any
  op:ordersProducts={};

  orderId:any;
  constructor(private CartService:CartService
              ,private confirmationService: ConfirmationService,
              private OrderService:OrderService,
             private primengConfig: PrimeNGConfig
              ,private cs :CustomerService,
              private CustomerProductsServ:CustomerProductsService
              ,private router:Router,
              private MessageService:MessageService

              ) {

              }


  deleteprod(id:number){
    debugger
    this.cartproduct = JSON.parse(localStorage.getItem(this.id));
    var result = this.cartproduct.findIndex(x => parseInt(x.product.id)  == id);
    if (result > -1) {
      // delete this.cartproduct[result];
      this.cartproduct.splice(result, 1);
      localStorage.setItem(this.id, JSON.stringify(this.cartproduct));
      this.products = JSON.parse(localStorage.getItem(this.id));
      window.location.reload();

    }


  }

  productPlus(id: number) {
    this.cartproduct = JSON.parse(localStorage.getItem(this.id));
    var result = this.cartproduct.findIndex(x => parseInt( x.product.id) == id);
    if (result != -1) {
      if (this.cartproduct[result].quantityToOrder < 10) {
        this.cartproduct[result].quantityToOrder++;
        localStorage.setItem(this.id, JSON.stringify(this.cartproduct))
        this.products = JSON.parse(localStorage.getItem(this.id));
        window.location.reload();

      } else {
        alert('you cant add more than 10 items ')
      }
    }
  }


  productMinus(id: number) {
    this.cartproduct = JSON.parse(localStorage.getItem(this.id));
    var result = this.cartproduct.findIndex(x => parseInt(x.product.id )== id);
    console.log(result)
    if (result != -1) {
      if (this.cartproduct[result].quantityToOrder > 0) {
        this.cartproduct[result].quantityToOrder--;
        localStorage.setItem(this.id, JSON.stringify(this.cartproduct))
        this.products = JSON.parse(localStorage.getItem(this.id));
        window.location.reload();
      }
    }
  }

  getTotalAmount(products:any){
    debugger
    var total=0;
    if (products) {
      for (let index = 0; index < products.length; index++) {
        var speficPrice=0;
        speficPrice=products[index].product.productPrice-(products[index].product.discount /100*products[index].product.productPrice )
        speficPrice=speficPrice*products[index].quantityToOrder;
        total+=speficPrice;
      }

    }

    return total
  }
  async ngOnInit() {
    this.user= await this.cs.getCustomer();
    this.id=this.user.id.toString()
    this.products = JSON.parse(localStorage.getItem(this.id));
    console.log(this.products);
    this.primengConfig.ripple = true;
    this.totalPrice=this.getTotalAmount(this.products)
    if (this.products.length>0) {
      render({
        id:"#paypal",
        currency:"ILS",
        value:this.totalPrice.toFixed(2),
        onApprove:async (details)=>{

           await this.checkOut();
           debugger
           // add to new table old products --- pp
           // pp set -> cart{------} 
              var a =localStorage.getItem(this.id)
              this.op.customerId=parseInt(this.id);
              this.op.orderId=this.orderId;
              this.op.products= JSON.parse(a);

              //add Cart to new local storage table befor we clear the cart 
              console.log(this.op)
              let value = JSON.stringify(this.op);
              let key ="o"+this.orderId;
              localStorage.setItem(key,value);

              
           //.....................................
            localStorage.removeItem(this.id)
            this.products = JSON.parse(localStorage.getItem(this.id));
             // alert('Transaction Complete , please wait For Confirmation email ')
              this.MessageService.add({severity:'success', summary: 'Success', detail: ' All Complete ! youll Recive an a Confirmation Email '});
              this.totalPrice=0;




        }
      });

    }



    // window.paypal.Buttons(
    //   {
    //     style:{
    //       layout:'horizontal',
    //       color:'black',
    //       shape:'pill',
    //       label:'paypal'

    //     },
    //     createOrder:(data,actions)=> {
    //       return actions.order.create({
    //         purchase_units:[
    //           {
    //             amount:{
    //               value:this.totalPrice.toFixed(2) ,
    //               currency_code:"ILS"
    //             }

    //             }
    //         ]

    //       });
    //     },
    //     onApprove:(data,actions)=>{
    //       this.checkOut();
    //       return actions.order.capture().then(details=>{
    //         alert('Transaction completed ! ')
    //       });
    //     },
    //     onError: error =>{
    //       console.log(error)
    //     }
    //   }
    // ).render(this.paypalRef.nativeElement)
  }


  async checkOut(){
    var orderid=0;
    var a = {
      customerId:this.user.id,
      frieght:0
    }

    try {
      var s = await this.OrderService.addItem(a);
      //save order id to use it in  cart table and customerProduct
      this.OrderService.orderId=s.id;
      orderid=s.id
      orderid=s.id
      this.orderId=s.id;
      console.log('order : ', s)

    } catch (error) {
      alert('cannot Create  this orders ! ')
    }


    //then we create the cart table
    try {
      var cartc= {
        totalAmount:this.getTotalAmount(this.products),
        orderId:this.OrderService.orderId,
        paymentType:"cash",
        tax:0.17
      }

      var resCart=await this.CartService.addItem(cartc);
      console.log( 'cart :' ,resCart)
      //also we save product id in service to user it

      this.CartService.cartId=resCart.id;

    } catch (error) {
console.log('cannot Creat Cart ')
    }


    try {
      debugger
      //send customer products to the customer product table
      for (let index = 0; index < this.products.length; index++) {
        var cp={
          cartId:this.CartService.cartId,
          orderId:this.OrderService.orderId,
          productId:this.products[index].product.id,
          quantity:this.products[index].quantityToOrder
        }

       var res= await this.CustomerProductsServ.addItem(cp)
       console.log(res)
      }
      this.CartService.cartId=null;
      this.OrderService.orderId=null;

    } catch (error) {
      console.log('error while upploading products (customerProduct error)')
    }

  }

}
