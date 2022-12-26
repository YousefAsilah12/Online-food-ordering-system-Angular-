import { CustomerService } from './../../../shared/services/customer.service';
import { Customer } from './../../../shared/models/customer';
import {
  Component,
  OnInit
} from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { read } from 'fs';
import { isNull } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
import * as $ from "jquery";
interface City {
  name: string
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  uploadedFiles: any[] = [];

customerDialog: boolean;

customers: Customer[];

 customer:Customer;

  selectedCustomers: Customer[];

  submitted: boolean;

  statuses: boolean[];


  cities: City[];
  selectedCity: City;



  invalidDates: Array<Date>
  date6:any;
 img
 message
  constructor( private CustomerService: CustomerService,
     private messageService: MessageService,
      private confirmationService: ConfirmationService) {
        this.cities = [
          {name: 'Jerusalem'},

      ];
      }

  async ngOnInit() {
    this.img=null
    this.customers = await this.CustomerService.getAll();
    console.log(this.customers)

    this.statuses = [true, false];



  }

  openNew() {
    debugger
    this.img=null
    this.customer = {};
    this.submitted = false;
    this.customerDialog = true;
  }

  deleteSelectedCustomers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected customers?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.customers = this.customers.filter(val => !this.selectedCustomers.includes(val));
        for (let index = 0; index < this.selectedCustomers.length; index++) {
          await this.CustomerService.deleteItem (this.selectedCustomers[index].id)

        }
        this.customers=await this.CustomerService.getAll();

        this.selectedCustomers = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'customers Deleted',
          life: 3000
        });
      }
    });
  }

  editCustomer(customer: Customer) {
    debugger

    this.customer = {
      ...customer
    };
    this.customerDialog = true;
    this.img=null
    this.date6=new Date(this.customer.birthdate)
     this.selectedCity={name:  this.customer.city.toString()}


  }

  async deleteCustomer(customer: Customer) {
    debugger
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + customer.firstName+' '+customer.lastName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
              // this.Customers = this.Customers.filter(val => val.id !==customer.id);
        await this.CustomerService.deleteItem(customer.id)
        this.customers=await this.CustomerService.getAll();
         this.customer = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'customer Deleted',
          life: 3000
        });
        } catch (error) {
          alert('this user has a  order on progress , you cant delete it !')
        }
    
      }
    });
  }

  hideDialog() {
    this.customerDialog = false;
    this.submitted = false;
  }

  getSupplierIdByName(name: string) {

  }


  async saveCustomer() {
    debugger
    this.submitted = true;
    let formattedDate = (moment(this.date6)).format('DD-MMM-YYYY HH:mm:ss')
    console.log('formattedDate '+formattedDate)
    //  this.customer.birthdate=this.date6;
    this.customer.city=this.selectedCity.name;
    console.log(this.customer)
    //image :--->
    const fd = new FormData();
    if (this.customer.id) {
      fd.append('id',this.customer.id.toString());

    }
    fd.append('firstName',this.customer.firstName);
    fd.append('lastName',this.customer.lastName);
    fd.append('password',this.customer.password);
    fd.append('birthdate',formattedDate);
    fd.append('phone',this.customer.phone);
    fd.append('email',this.customer.email);
    fd.append('homeNo',this.customer.homeNo.toString());
    fd.append('street',this.customer.street);
    fd.append('city',this.customer.city);
    fd.append('image',this.img);
    fd.append('imageNotChanged',this.customer.image);

   var id= fd.get('id')
   console.log(id)
    if (id) {
      // await this.CustomerService.PutCustomer(this.customer, this.customer.id)
      await (await this.CustomerService.PutEmployee2(fd)).subscribe(async Emp=>{
        this.message='user have benn updated ! '
        this.customer = await this.CustomerService.getAll();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Customer Updated',
          life: 3000
        });
      },ex=>{
        console.log(ex)
        this.message=null
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: ex.error,
          life: 3000
        });
      }
      )


    } else {
     // this.customer.image = 'https://png.pngtree.com/png-vector/20190525/ourlarge/pngtree-man-avatar-icon-professional-man-character-png-image_1055448.jpg';
     console.log(fd.get('birthdate'))
      await (await this.CustomerService.postuser2(fd)).subscribe(async user=>{
        this.message='user have benn added'
        this.customers = await this.CustomerService.getAll();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Customer Updated',
          life: 3000
        });
      },ex=>{
        console.log(ex)
        this.message=null
        this.messageService.add({
          severity: 'error  ',
          summary: 'Error',
          detail: ex.error,
          life: 3000
        });
      }
      )
      this.customers = await this.CustomerService.getAll();

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Customer Created',
        life: 3000
      });
    }

    this.customers = [...this.customers];
    this.customerDialog = false;
    this.customer = {};
  }

  createId()  {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }



  //image select
  HandleFiles(event:any)
  {
    console.log(event)
    if (event.target.files!== event.target.files.length >0) {
      this.img=event.target.files[0];
      const reader=new FileReader();
      reader.onload=function(e){
        $('#image').attr('src',e.target.result as string);
      }
      reader.readAsDataURL(this.img)
    }else{
      this.img=null;
     // $('#image').attr('src',e.target.result);

    }
  }


}








