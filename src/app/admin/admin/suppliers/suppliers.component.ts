import { SuppliersService } from 'src/app/shared/services/suppliers.service';
import { Suppliers } from 'src/app/shared/models/suppliers';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import * as $ from "jquery";

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  supplierDialog: boolean;

  suppliers: Suppliers[];

  supplier: Suppliers;

  selectedsuppliers: Suppliers[];

  submitted: boolean;

  statuses: boolean[];
  img: any;
  message: string;





  constructor( private SupplierService: SuppliersService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  async ngOnInit() {
    this.suppliers = await this.SupplierService.getAll();
    console.log(this.suppliers)

    this.statuses = [true, false]

  }
  openNew() {
    this.supplier ={};
    this.img=null
    this.submitted = false;
    this.supplierDialog = true;
  }

  deleteSelectedsuppliers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected suppliers ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.suppliers = this.suppliers.filter(val => !this.selectedsuppliers.includes(val));
        for (let index = 0; index < this.selectedsuppliers.length; index++) {
          await this.SupplierService.deleteItem(parseInt(this.selectedsuppliers[index].id) )

        }
        this.suppliers=await this.SupplierService.getAll();

        this.selectedsuppliers = [{}];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'supplier Deleted',
          life: 3000
        });
      }
    });
  }

  editsupplier(supplier: Suppliers) {
    console.log(supplier)
    this.supplier = {
      ...supplier
    };
    this.img=null
    this.supplierDialog = true;
  }

  async deletesupplier(supplier: Suppliers) {
    debugger
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + supplier.companyTitle +' '+supplier.companyName+  '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        // this.products = this.products.filter(val => val.id !== product.id);
        await this.SupplierService.deleteItem( parseInt(supplier.id))
        this.suppliers=await this.SupplierService.getAll();
         this.supplier = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'supplier Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.supplierDialog = false;
    this.submitted = false;
  }


  async savesupplier() {
    this.submitted=true
    const fd = new FormData();
    if (this.supplier.id) {
      fd.append('id',this.supplier.id.toString());

    }
    fd.append('companyTitle',this.supplier.companyTitle);
    fd.append('companyName',this.supplier.companyName);
    fd.append('Address',this.supplier.Address);
    fd.append('phone',this.supplier.phone);
    fd.append('email',this.supplier.email);
    fd.append('fax',this.supplier.fax);
    fd.append('image',this.img);
    fd.append('imageNotChanged',this.supplier.image);

    debugger
    console.log(this.supplier)
    console.log(this.supplier.id)
    this.submitted = true;

    var id= fd.get('id')

    if (id) {
      await (await this.SupplierService.PutSupplier2(fd)).subscribe(async Emp=>{
        this.suppliers = await this.SupplierService.getAll();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'supplier Updated',
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
      await (await this.SupplierService.postSupplier2(fd)).subscribe(async Emp=>{
        this.suppliers = await this.SupplierService.getAll();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'supplier Updated',
          life: 3000
        });}
      // },ex=>{
      //   console.log(ex)
      //   this.message=null
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Error',
      //     detail: ex.error,
      //     life: 3000
      //   });
      // }
      )

      // this.messageService.add({
      //   severity: 'success',
      //   summary: 'Successful',
      //   detail: 'supplier Created',
      //   life: 3000
      // });
    }

    this.suppliers = [...this.suppliers];
    // this.supplierDialog = false;
    this.supplier = {};
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
