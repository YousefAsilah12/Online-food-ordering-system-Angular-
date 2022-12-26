import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categories } from 'src/app/shared/models/categories';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CategorieService } from 'src/app/shared/services/categorie.service';
import * as $ from "jquery";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class CategoriesComponent implements OnInit {
  formGroup:FormGroup;

  CategoryDeleteTemplate: boolean;
  categoryDialog: boolean;
  switchCategoryDialog: boolean=false;

  categories: Categories[];
  CategoriesWithOutDeleted:Categories[]=[];

  category: Categories={};

  selectedCategories: Categories[];

  submitted: boolean;

  statuses: boolean[];

  slectedSwitchCategory
  oldCategory
  img: any;
  message: string;



  constructor( private CategoryService: CategorieService, private messageService: MessageService,private confirmationService2: ConfirmationService, private confirmationService: ConfirmationService) {}

  async ngOnInit() {
    this.initForm()
    this.categories = await this.CategoryService.getAll();
    console.log(this.categories)

    this.statuses = [true, false]

  }
  initForm(): void {
    this.formGroup=new FormGroup({
      firstName:new FormControl('',Validators.required),
      productDescription:new FormControl('',Validators.required),
      image:new FormControl(null,Validators.required),

    });

  }
  updateForm() : void{
    this.formGroup.controls['firstName'].setValue(this.category.firstName);
    this.formGroup.controls['productDescription'].setValue(this.category.productDescription);
    this.img=this.category.image
  }

  openNew() {
    this.img=null
    this.category ={};
    this.submitted = false;
    this.categoryDialog = true;
  }
  openCategoryDeleteTemplate() {
    this.confirmationService.close()
   // this.category ={};
    this.submitted = false;
    this.CategoryDeleteTemplate = true;
  }

  openSwitchCategoryDialog() {
    debugger
    //this.category ={};
    this.submitted = false;
    this.switchCategoryDialog = true;
  }

  deleteSelectedCategories() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected categories ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.categories = this.categories.filter(val => !this.selectedCategories.includes(val));
        for (let index = 0; index < this.selectedCategories.length; index++) {
          await this.CategoryService.deleteItem(this.selectedCategories[index].id)

        }
        this.categories=await this.CategoryService.getAll();

        this.selectedCategories = [{}];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'category Deleted',
          life: 3000
        });
      }
    });
  }

  editCategory(category: Categories) {
    console.log(category)
    this.category = {
      ...category
    };
    this.img=null
    this.updateForm();
    this.categoryDialog = true;
  }

  async switchCategoryFunc(){
    debugger
    if (this.oldCategory&&this.slectedSwitchCategory) {


    await this.CategoryService.deleteWithSwitchCategory(this.oldCategory.id,this.slectedSwitchCategory.id);
    this.categories=await this.CategoryService.getAll();
        this.hideSwitchCategoryDialog();
    this.hideCategoryDeleteTemplate();

    await this.CategoryService.deleteWithSwitchCategory(this.oldCategory.id,this.slectedSwitchCategory.id);
    this.messageService.add({
      severity: 'success',
      key:'switchCategoryFunc',
      summary: 'Successful',
      detail: 'Category :'+ this.oldCategory.firstName+' Deleted  , and the products saved in '+this.slectedSwitchCategory.firstName+'!',
      life: 6000
    });

  }
  this.oldCategory={}
  this.slectedSwitchCategory={}

}


   async deleteCategory() {
    this.hideCategoryDeleteTemplate()
await this.CategoryService.deleteItem(this.oldCategory.id);
this.categories= await this.CategoryService.getAll();
this.messageService.clear();
this.messageService.clearObserver
this.messageService.add({
  severity: 'success',
  summary: 'Successful',
  detail: 'Category Updated',
  life: 3000
});
this.oldCategory={}
this.slectedSwitchCategory={}
// this.messageService.add({
//   severity: 'success',
//   summary: 'Successful',
//   detail: 'Category  "'+this.oldCategory.firstName+' " Deleted and the products of it ',
//   life: 6000
// });

}

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  hideSwitchCategoryDialog() {
    this.switchCategoryDialog = false;
    this.submitted = false;
  }
  hideCategoryDeleteTemplate() {
    this.CategoryDeleteTemplate = false;
    this.submitted = false;
  }

DeleteTemplateFunc(category:Categories){
  this.oldCategory=category;
  var count =0;
      for (let index = 0; index < this.categories.length; index++) {
        if (this.categories[index].id!=category.id) {
          this.CategoriesWithOutDeleted[count]=this.categories[index];
          count++;
        }
}
console.log('delete'+this.oldCategory.firstName)

  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the '+this.oldCategory.firstName+' category  ?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      this.openCategoryDeleteTemplate();
     /// this.selectedCategories = [{}];
      // this.messageService.add({
      //   severity: 'success',
      //   summary: 'Successful',
      //   detail: 'category Deleted',
      //   life: 3000
      // });
    }
  });



}

  async saveCategory() {
    console.log(this.formGroup.value['image'])
    debugger
    if(this.formGroup.valid){
      this.submitted = true;
      const fd = new FormData();
      if (this.category.id) {
        fd.append('id',this.category.id.toString());

      }
      fd.append('firstName',this.formGroup.value['firstName']);
      fd.append('ProductDescription',this.formGroup.value['productDescription']);
      fd.append('image',this.img);
      fd.append('imageNotChanged',this.category.image);




      if (this.category.id) {
        await (await this.CategoryService.PutCategory2(fd)).subscribe(async Category=>{
          this.message='Category Updated  ';
          this.categories = await this.CategoryService.getAll();
          this.messageService.clear()
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'category updated',
            life: 3000
          });

        },ex=>{
          console.log(ex)
          this.message=null
        }
        )

      } else {
        // this.product.image = 'product-placeholder.svg';

        await (await this.CategoryService.PostCategory2(fd)).subscribe(async Category=>{
          this.message='user have benn added'
          this.categories = await this.CategoryService.getAll();
          this.messageService.clear()
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'category Created',
            life: 3000
          });

        },ex=>{
          console.log(ex)
          this.message=null
        }
        )
        this.categories = await this.CategoryService.getAll();

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'category Created',
          life: 3000
        });
      }

      this.categories = [...this.categories];
      this.categoryDialog = false;
      this.category = {};

    }
    else{
      alert('form not valid ')
    }
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
