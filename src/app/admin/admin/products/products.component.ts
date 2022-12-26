import { Products } from './../../../shared/models/products';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Categories } from 'src/app/shared/models/categories';
import { Suppliers } from 'src/app/shared/models/suppliers';
import { CategorieService } from 'src/app/shared/services/categorie.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SuppliersService } from 'src/app/shared/services/suppliers.service';
import { count } from 'console';
import * as $ from "jquery";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class ProductsComponent implements OnInit {

  slectedCategory: Categories;
  selectedSupplier: Suppliers;

  productDialog: boolean;
  DiscountDialog: boolean;
  DiscountDialog2:boolean;
  RemoveDiscountDialog:boolean
  categoryDiscountDialog:boolean

  products: Products[];
  productsInSale: Array<Products>;


  product: Products;

  selectedProducts: Products[];
  selectedProductsDiscount: Products[];
  selectedToRemoveDiscount: Products[];
  submitted: boolean;

  statuses: boolean[];

  suppliers: Suppliers[];

  categories: Categories[];

  discount:number

  slectedDiscountCategory:Categories
  CategoryDiscountNumber
  img: any;
  message: string;

  constructor(private SupplierService: SuppliersService, private CategoryService: CategorieService, private productService: ProductsService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  async ngOnInit() {
    this.products = await this.productService.getAll();
    this.categories = await this.CategoryService.getAll();
    this.suppliers = await this.SupplierService.getAll();
    console.log(this.products)
    console.log(this.categories)
    console.log(this.suppliers)

    this.statuses = [true, false]

  }
  openNew() {
    this.img=null;
    this.selectedSupplier=null
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  openDiscount(){
    this.product = {};
    this.submitted = false;
    this.DiscountDialog = true;

  }
  openDiscount2(){
    this.product = {};
    this.submitted = false;
    this.DiscountDialog2 = true;

  }
  openRemoveDiscount(){
    this.product = {};
    this.submitted = false;
    this.RemoveDiscountDialog = true;

  }
  openCategoryDiscount(){
    this.product = {};
    this.submitted = false;
    this.categoryDiscountDialog = true;

  }




  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        for (let index = 0; index < this.selectedProducts.length; index++) {
          await this.productService.deleteItem(parseInt(this.selectedProducts[index].id))

        }
        this.products=await this.productService.getAll();

        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 5000
        });
      }
    });
  }

  editProduct(product: Products) {
    this.slectedCategory={}
    this.selectedSupplier={}
    this.product = {
      ...product
    };
    this.img=null;
    this.productDialog = true;
    this.slectedCategory=this.product.category;
    this.selectedSupplier=this.product.supplier;
    console.log(this.slectedCategory)

  }

  async deleteProduct(product: Products) {
    debugger
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.productName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        // this.products = this.products.filter(val => val.id !== product.id);
        await this.productService.deleteItem(parseInt(product.id))
        this.products=await this.productService.getAll();
         this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 5000
        });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  hideDiscountDialog() {
    this.DiscountDialog = false;
    this.submitted = false;
  }
  hideDiscountDialog2() {
    this.DiscountDialog2 = false;
    this.submitted = false;
  }
  hideRemoveDiscountDialog() {
    this.RemoveDiscountDialog = false;
    this.submitted = false;
  }
  hideCategoryDicountDialog() {
    this.categoryDiscountDialog = false;
    this.submitted = false;
  }



  getSupplierIdByName(name: string) {

  }

  async saveProduct() {
    debugger
    this.submitted = true;
    const fd = new FormData();

    this.product.categoryId = this.slectedCategory.id;
    this.product.supplierId = parseInt(this.selectedSupplier.id);
    if (this.product.id) {
      fd.append('id',this.product.id.toString());

    }
    fd.append('productName',this.product.productName);
    fd.append('supplierId',this.product.supplierId.toString());
    fd.append('categoryId',this.product.categoryId.toString());
    fd.append('productDescription',this.product.productDescription);
    fd.append('productPrice',this.product.productPrice.toString());
    fd.append('image',this.img);
    fd.append('active',this.product.active.toString());
    fd.append('discount',this.product.discount.toString());
    fd.append('stockQuantity',this.product.stockQuanitity.toString())
    fd.append('imageNotChanged',this.product.image);

    var post = {
      supplierId: this.product.supplierId,
      categoryId: this.product.categoryId,
      serialNumber: this.product.serialNumber,
      ProductName: this.product.productName,
      image: "product-placeholder.svg",
      active: Boolean(this.product.active),
      discount: this.product.discount,
      stockQuanitity: this.product.stockQuanitity,
      ProductDescription: this.product.productDescription,
      productPrice:this.product.productPrice

    }


    console.log(post)
    if (this.product.id) {
      fd.append('serialNumber',this.product.serialNumber);
      await (await this.productService.PutProduct2(fd)).subscribe(async p=>{
        this.message='product Updated ! '
        this.products = await this.productService.getAll();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 5000
        });

      },ex=>{
        console.log(ex.error)
        this.message=null
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: ex.error,
          life: 5000
        });

      }
      )

    } else {
      // this.product.image = 'product-placeholder.svg';
      fd.append('serialNumber',this.createId());
      await (await this.productService.postProduct2(fd)).subscribe(async p=>{
        this.message='user have benn added'
        this.products = await this.productService.getAll();

      },ex=>{
        console.log(ex)
        this.message=null
      }
      )

    }

    this.products = [...this.products];
    this.productDialog = false;
    this.product = {};
  }
  createId()  {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  //it update the product if active or Not ...
  productfalse(){
    this.product.active=false;
  }
  productTrue(){
    this.product.active=true;

  }

  //its will post or Remove the item from the customer Page
  async EditProductStatus(product:Products){
    console.log(product)

    if (product.active==true) {
      this.confirmationService.confirm({
        message: 'Are you sure you  to publish this product ' + product.productName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          product.active=false
          await this.productService.updateItem(product, parseInt(product.id))
          this.products = await this.productService.getAll();
              this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 5000
          });
        }
      });

    }
    else{
      this.confirmationService.confirm({
        message: 'Are you sure you  to disable  this product ' + product.productName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          product.active=true

          await this.productService.updateItem(product, parseInt(product.id))
          this.products = await this.productService.getAll();
              this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 5000
          });
        }
      });

    }




  }
getProductsInSale(){
  var a :Array<Products>=[];
  for (let index = 0; index < this.products.length; index++) {
    if (this.products[index].discount >0 ) {
      a.push(this.products[index])
    }

   }
   return a ;

}
  discountfunction(){
debugger
    // if we have selected item we open template #1
    // else we Open #2 template (other Template ).
    // this.getProductsInSale()
    this.productsInSale=this.getProductsInSale()
    if ( this.selectedProducts&&this.selectedProducts.length>=1) {

      this.openDiscount();
    }
    else{
          //first get the items are on Sale

          console.log("items on sale " , this.productsInSale)

      this.openDiscount2();
    }
    // this.products = [...this.products];
    // this.DiscountDialog = false;
    // this.product = {};

  }

  SaveDiscount(){
    this.confirmationService.confirm({
      message: 'Are you sure you want to Add Discountfor the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        for (let index = 0; index < this.selectedProducts.length; index++) {
          this.selectedProducts[index].discount=this.discount
          await this.productService.updateItem(this.selectedProducts[index], parseInt(this.selectedProducts[index].id))

        }
        this.hideDiscountDialog();
        this.products=await this.productService.getAll();

        this.selectedProducts = null;
        this.discount=null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Discount added ! ',
          life: 5000
        });
      }
    });

  }


  async removeDiscount(){
  this.openRemoveDiscount()
  this.hideDiscountDialog2();

    //debugger
    // if (this.productsInSale) {

    //   this.confirmationService.confirm({
    //     message: 'Are you sure you want to remove Discount from  the selected products?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: async () => {
    //       this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    //       for (let index = 0; index < this.productsInSale.length; index++) {
    //         this.productsInSale[index].discount=0;
    //         await this.productService.updateItem(this.productsInSale[index],parseInt(this.productsInSale[index].id))
    //       }
    //       this.hideDiscountDialog2();
    //       this.products=await this.productService.getAll();

    //       this.selectedProducts = null;
    //       this.discount=null;
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Successful',
    //         detail: 'Discount added ! ',
    //         life: 5000
    //       });
    //     }
    //   });

    // }


  }

  AddDiscountByCategory(){
    this.hideDiscountDialog2();

    this.openCategoryDiscount();
  }

  async saveCategoryDiscoint(){
    this.submitted = true;
    var itemsToRemoveDiscout:Array<Products>=[];
     itemsToRemoveDiscout=await this.productService.getProductsNyCategoryId(this.slectedDiscountCategory.id)
    console.log(itemsToRemoveDiscout)
    this.confirmationService.confirm({
      message: 'Are you sure you  to Add discount for  ' + this.slectedDiscountCategory.firstName + 'category product ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        // await this.productService.updateItem(product, parseInt(product.id))

        for (let index = 0; index < itemsToRemoveDiscout.length; index++) {
          itemsToRemoveDiscout[index].discount=this.CategoryDiscountNumber
          await this.productService.updateItem(itemsToRemoveDiscout[index],parseInt( itemsToRemoveDiscout[index].id))
        }
        this.products = await this.productService.getAll();
        this.hideCategoryDicountDialog()
            this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Discount added ! ',
          life: 5000
        });
      }
    });

  }
  async RemoveCategoryDiscount(){
    this.confirmationService.confirm({
      message: 'Are you sure you  to remove discount from   ' + this.slectedDiscountCategory.firstName + ' category products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        debugger
        var categoryProducts:Array<Products>=[];
        categoryProducts= await this.productService.getProductsNyCategoryId(this.slectedDiscountCategory.id)
        for (let index = 0; index < categoryProducts.length; index++) {
          categoryProducts[index].discount=0;
          await this.productService.updateItem(categoryProducts[index],parseInt( categoryProducts[index].id))
        }
        this.products = await this.productService.getAll();
        this.hideRemoveDiscountDialog();
            this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Discount Removed ! ',
          life: 6000
        });
      }
    });


  }


  RemoveDiscountFromSelected(){
    if (this.selectedToRemoveDiscount) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to remove discount from selected products ?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          // await this.productService.updateItem(product, parseInt(product.id))

          for (let index = 0; index < this.selectedToRemoveDiscount.length; index++) {
            this.selectedToRemoveDiscount[index].discount =0;
            await this.productService.updateItem( this.selectedToRemoveDiscount[index],parseInt(this.selectedToRemoveDiscount[index].id))
          }
          this.products = await this.productService.getAll();
          this.hideRemoveDiscountDialog()
              this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Discount Removed',
            life: 5000
          });
        }
      });

    }
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
     validateEmail(email):boolean {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

}
