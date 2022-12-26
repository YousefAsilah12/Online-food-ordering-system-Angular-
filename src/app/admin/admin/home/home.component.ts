import { SuppliersService } from 'src/app/shared/services/suppliers.service';
import { Suppliers } from 'src/app/shared/models/suppliers';
import { Orders } from './../../../shared/models/orders';
import { OrderService } from './../../../shared/services/order.service';
import { EmployeesComponent } from './../employees/employees.component';
import { Customer } from 'src/app/shared/models/customer';
import { Employee } from './../../../shared/models/employee';
import { EmployeeService } from './../../../shared/services/employee.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  responsiveOptions
  uploadedFiles: any[] = [];

  AllUsers:number=0
  AdminsLength:number =0
  Employeeslength:number=0
  customerLength:number=0
  OrdersLength:number=0;
  supplierLength:number=0;


employees:Employee[]
templateView:any[];
  constructor(private messageService: MessageService,
              private CustomerService:CustomerService,
              private EmployeeService:EmployeeService,
              private OrderService:OrderService,
              private SuppliersService:SuppliersService) {}

  onUpload(event) {
    console.log(event.file)

      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }

      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
  async ngOnInit() {
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
    debugger

    var s =await this.SuppliersService.getAll()
    this.supplierLength=s.length
   var a =await this.CustomerService.getAll()
   var orders = await this.OrderService.getAll()
    this.OrdersLength=orders.length
    this.customerLength=a.length
    this.AllUsers=this.customerLength

    this.employees = await this.EmployeeService.getAll();
    debugger
    for (let index = 0; index < this.employees.length; index++) {
    var k =this.employees[index].role.toLocaleLowerCase()
      if (k=="admin") {
        this.AdminsLength++;
        this.AllUsers++
      }
      else {
        this.Employeeslength++;
        this.AllUsers++
      }


    }
    console.log("all Users",this.AllUsers)
    console.log("admins",this.AdminsLength)
    console.log("Employees",this.Employeeslength)
    console.log("Customers",this.customerLength)
this.templateView=[
  {
    name:"allUsers",value:this.AllUsers
  }
  ,
  {
    name:"Employees",value:this.Employeeslength
  }
  , {
    name:"Customers",value:this.customerLength
  },
  {
    name:"admins",value:this.AdminsLength
  },
  {
    name:"suppliers",value:this.supplierLength
  }
]
  }
  log(){
    // console.log(this.uploadedFiles)
    console
  }
}
