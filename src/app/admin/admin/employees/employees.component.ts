import { EmployeeService } from './../../../shared/services/employee.service';
import { Employee } from './../../../shared/models/employee';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import * as $ from "jquery";
interface role{
  name:string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [DatePipe]
})
export class EmployeesComponent implements OnInit {

  employeeDialog: boolean;

  employees: Employee[];

  employee:Employee;

    selectedemployees: Employee[];

    submitted: boolean;

    statuses: boolean[];



  roles:role[];
  selectedRole:role;
    invalidDates: Array<Date>
    birthDate: Date;
    hireDate: Date;
    myDate = new Date();
  img: any;
  message: string;
    constructor( private employeeService: EmployeeService,
       private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe) {
          this.roles = [
           {name:"Admin"},
           {name:"Employee"},

         ];
        //  this.date = this.datePipe.transform(this.hireDate, 'yyyy-MM-dd');
        }

    async ngOnInit() {
      this.employees = await this.employeeService.getAll();
      console.log(this.employees)

      this.statuses = [true, false];
      var a = new Date
      console.log(a)


    }
    openNew() {
      this.img=null;
      this.employee = {};
      this.submitted = false;
      this.employeeDialog = true;
    }

    deleteSelectedEmployees() {
      debugger
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected employees?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          this.employees = this.employees.filter(val => !this.selectedemployees.includes(val));
          for (let index = 0; index < this.selectedemployees.length; index++) {
            await this.employeeService.deleteItem (this.selectedemployees[index].id)

          }
          this.employees=await this.employeeService.getAll();

          this.selectedemployees = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'employee Deleted',
            life: 3000
          });
        }
      });
    }

    editEmployee(employee: Employee) {
      this.employee = {
        ...employee
      };
      this.employeeDialog = true;
      this.img=null
      this.birthDate=new Date(this.employee.birthDate)
      this.hireDate=new Date(this.employee.hireDate)
      this.selectedRole= {name:this.employee.role}

    }

    async deleteEmployee(employee: Employee) {
      debugger
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + employee.firstName+' '+employee.lastName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          // this.Employees = this.Employees.filter(val => val.id !==Employee.id);
          await this.employeeService.deleteItem(employee.id)
          this.employees=await this.employeeService.getAll();
           this.employee = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'employee Deleted',
            life: 3000
          });
        }
      });
    }

    hideDialog() {
      this.employeeDialog = false;
      this.submitted = false;
    }


    async saveEmployee() {
      debugger
      this.submitted = true;
      const fd = new FormData();
      let formattedDate = (moment(this.birthDate)).format('DD-MMM-YYYY HH:mm:ss')
      let formatteHireDate=(moment(this.hireDate)).format('DD-MMM-YYYY HH:mm:ss')
      this.employee.role=this.selectedRole.name;
      //this.Employee.city=this.selectedCity.name;
      console.log(this.employee)

      if (this.employee.id) {
        fd.append('id',this.employee.id.toString());

      }
      fd.append('firstName',this.employee.firstName);
      fd.append('lastName',this.employee.lastName);
      fd.append('image',this.img);
      fd.append('password',this.employee.password);
      fd.append('homeNo',this.employee.homeNo.toString());
      fd.append('street',this.employee.street);
      fd.append('city',this.employee.city);
      fd.append('hireDate',formatteHireDate);
      fd.append('birthdate',formattedDate);
      fd.append('email',this.employee.email);
      fd.append('role',this.employee.role);


      if (this.employee.id) {
        this.employee.hireDate=this.hireDate;
       // await this.employeeService.PutEmployee(this.employee, this.employee.id)

       //2nd with Image
        var res= await (await this.employeeService.PutEmployee2(fd)).subscribe(async Emp=>{
          this.message='employee have benn updated ! '
          this.employees = await this.employeeService.getAll();

        },ex=>{
          console.log(ex)
          this.message=null
        }
        )

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'employee Updated',
          life: 3000
        });
      } else {

        // this.employee.hireDate=this.myDate;
        // this.employee.image = 'https://png.pngtree.com/png-vector/20190525/ourlarge/pngtree-man-avatar-icon-professional-man-character-png-image_1055448.jpg';
        await (await this.employeeService.postEmp2(fd)).subscribe(async Emp=>{
          this.message='employee have benn added'
          this.employees = await this.employeeService.getAll();

        },ex=>{
          console.log(ex)
          this.message=null
        }
        )
        this.employees = await this.employeeService.getAll();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'employee Created',
          life: 3000
        });
      }

      this.employees = [...this.employees];
      this.employeeDialog = false;
      this.employee = {};
    }
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
