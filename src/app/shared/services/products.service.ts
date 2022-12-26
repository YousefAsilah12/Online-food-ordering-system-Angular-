import { Products } from './../models/products';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  public endPointApi = 'https://localhost:44318/api/Products/';

  getProductsSmall() {
    return this.http.get<any>(this.endPointApi)
    .toPromise();
}
getProductsByPrimeNG() {
  return this.http.get<any>(this.endPointApi)
  .toPromise()
  .then(res => <Products[]>res.data)
  .then(data => { return data; });
}

  async getSingleItem(id: number):Promise<Products>{
    return this.http.get(this.endPointApi + id).toPromise<any>();
  }

  async getAll(): Promise<any>{
    return this.http.get(this.endPointApi ).toPromise<any>();
  }
  async getProductsNyCategoryId(id:number): Promise<any>{
    return this.http.get(this.endPointApi+'ByCatagoryId/'+id ).toPromise<any>();
  }


  async addItem(post: any): Promise<Products>{
    return  await this.http.post(this.endPointApi , post).toPromise<any>();
  }
  async postProduct2(formData:FormData){
    debugger
    return await this.http.post(this.endPointApi,formData).pipe();
  }

 async deleteItem(id: number): Promise<Products>{
    return this.http.delete(this.endPointApi  + id).toPromise<any>();
  }
  async PutProduct2(formData:FormData){
    debugger
    return await this.http.put(this.endPointApi,formData).pipe();
  }


  async updateItem(post: any, id: number): Promise<Products>{
    return this.http.put(this.endPointApi  + id, post).toPromise<any>();
  }}
