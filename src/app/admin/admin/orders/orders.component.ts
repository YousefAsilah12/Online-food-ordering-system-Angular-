import { Products } from 'src/app/shared/models/products';
import { ordersProducts } from './../../../shared/models/products';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Orders } from './../../../shared/models/orders';
import { OrderService } from './../../../shared/services/order.service';
import { Employee } from './../../../shared/models/employee';
import { AdminService } from './../../../shared/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Customer } from 'src/app/shared/models/customer';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private AdminService:AdminService,
     private productService: ProductsService,
      private messageService: MessageService
      , private confirmationService: ConfirmationService,
      private OrderService:OrderService,
      private CustomerServ:CustomerService
      ,)
       { }

       orderDialog: boolean;  
       orderDetials: boolean=false;
      
       orders: Orders[];

       order: Orders;

       selectedorders: Orders[];

       submitted: boolean;

       statuses: boolean[];
       Admin:Employee;

         op :any={}
         products:Products ={}
       async ngOnInit() {
    this.Admin= await this.AdminService.getAdmin()
    console.log(this.Admin)

    this.orders = await this.OrderService.getAll();
    this.orders.reverse();
    console.log(this.orders)

    let a  =localStorage.getItem(("o"+67))
    this.op= JSON.parse(a);
    this.products=this.op.products;


  }
  openNew() {
    this.order = {};
    this.submitted = false;
    this.orderDialog = true;
  }
  openOrderDetails(id) {
    debugger
    console.log("the id is  "+id)
    this.submitted = false;
    this.orderDetials = true;

    // get the orderDetails from local storage ;
    let a  =localStorage.getItem(("o"+id))
    console.log(a)
    this.op= JSON.parse(a);
    console.log(this.op)
    this.products=this.op.products;
    console.log(this.products);


  }
  hideOrderDetails() {
    this.orderDetials = false;
    this.submitted = false;
  }

  getCustomerName(id:number):any{
     let item= this.CustomerServ.getSingleItem(id);
     if (item) {
      return item;
     } else {
      return -1;
     }
  }
  deleteSelectedorders() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected orders?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.orders = this.orders.filter(val => !this.selectedorders.includes(val));
        for (let index = 0; index < this.selectedorders.length; index++) {
          await this.OrderService.deleteItem(this.selectedorders[index].id)

        }
        this.orders=await this.OrderService.getAll();

        this.selectedorders = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'orders Deleted',
          life: 3000
        });
      }
    });
  }

  editorder(order: Orders) {
    this.order = {
      ...order
    };
    this.orderDialog = true;
  }

  async deleteorder(order: Orders) {
    debugger
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + order.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        // this.orders = this.orders.filter(val => val.id !== order.id);
        await this.OrderService.deleteItem(order.id)
        this.orders=await this.OrderService.getAll();
         this.order = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'order Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.orderDialog = false;
    this.submitted = false;
  }
async AcceptOrder(order:Orders){
  debugger
  var a : Employee
  a =await this.AdminService.getAdmin();
  console.log("admin : ",a)
  order.employeeId=a.id;
  console.log("order",order)
  var objectToPut={
    customerId:order?.customerId,
    employeeId:a.id,
    frieght:order.frieght
  }
  await this.OrderService.updateItem(objectToPut,order.id)
  await (await this.OrderService.SentRecipt(order.id)).subscribe(async user=>{
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Order Created Wait For Confirmation Email ',
      life: 6000
    });
  },ex=>{
    console.log(ex)
    this.messageService.add({
      severity: 'error  ',
      summary: 'Error',
      detail: "To accept Order Try Again  "+ex.error,
      life: 6000
    });
  }
  )
  this.orders=await this.OrderService.getAll();
}

  // async saveorder() {
  //   debugger
  //   this.order.categoryId = this.slectedCategory.id;
  //   this.product.supplierId = parseInt(this.selectedSupplier.id);
  //   this.submitted = true;
  //   var post = {
  //     supplierId: this.product.supplierId,
  //     categoryId: this.product.categoryId,
  //     serialNumber: this.product.serialNumber,
  //     ProductName: this.product.productName,
  //     image: "product-placeholder.svg",
  //     active: Boolean(this.product.active),
  //     discount: this.product.discount,
  //     stockQuanitity: this.product.stockQuanitity,
  //     ProductDescription: this.product.productDescription

  //   }


  //   console.log(post)
  //   if (this.product.id) {
  //     await this.OrderService.updateItem(post, parseInt(this.product.id))
  //     this.orders = await this.OrderService.getAll();

  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Successful',
  //       detail: 'Product Updated',
  //       life: 3000
  //     });
  //   } else {
  //     // this.product.image = 'product-placeholder.svg';
  //     post.serialNumber=this.createId();
  //     await this.OrderService.addItem(post)
  //     this.orders = await this.OrderService.getAll();

  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Successful',
  //       detail: 'Product Created',
  //       life: 3000
  //     });
  //   }

  //   this.orders = [...this.orders];
  //   this.productDialog = false;
  //   this.product = {};
  // }
  createId()  {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }


}
