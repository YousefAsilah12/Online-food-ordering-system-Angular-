import { Router } from '@angular/router';
import { CategorieService } from './../../../shared/services/categorie.service';
import { Categories } from './../../../shared/models/categories';
import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories:Categories[] ;
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  public category:Categories;

  constructor( private primengConfig: PrimeNGConfig,
                private catservice:CategorieService,
                private router :Router
                   ) { }




   ngOnInit(){
      // this.prodService.getAll().then(data => this.products = data);
      this.catservice.getAll().then(data => this.categories = data);

    this.sortOptions = [
        {label: 'Price High to Low', value: '!productPrice'},
        {label: 'Price Low to High', value: 'productPrice'}
    ];
    this.primengConfig.ripple = true;


  }
  travel(id:number){
    this.catservice.catSelected=id;
    this.router.navigate(['./Customer/products'])

  }


  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }

}

}
