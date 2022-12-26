import { CustomerProduct } from './../models/customer-product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerProductsService {

  constructor(private http: HttpClient) { }
  public endPointApi = 'https://localhost:44318/api/CustomersProducts/';

  async getSingleItem(id: number): Promise<CustomerProduct>{
    return this.http.get(this.endPointApi + id).toPromise<any>();
  }

  async getAll(): Promise<Array<CustomerProduct>>{
    return this.http.get(this.endPointApi ).toPromise<any>();
  }

  async addItem(post: any): Promise<CustomerProduct>{
    debugger;
    return  await this.http.post(this.endPointApi , post).toPromise<any>();
  }

 async deleteItem(id: number): Promise<CustomerProduct>{
    return this.http.delete(this.endPointApi  + id).toPromise<any>();
  }

  async updateItem(post: any, id: number): Promise<CustomerProduct>{
    return this.http.put(this.endPointApi  + id, post).toPromise<any>();
  }
}
