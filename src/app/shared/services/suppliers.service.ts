import { Suppliers } from './../models/suppliers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) { }
  public endPointApi = 'https://localhost:44318/api/suppliers/';

  async getSingleItem(id: number): Promise<Suppliers>{
    return this.http.get(this.endPointApi + id).toPromise<any>();
  }

  async getAll(): Promise<Array<Suppliers>>{
    return this.http.get(this.endPointApi ).toPromise<any>();
  }

  async addItem(post: any): Promise<Suppliers>{
    debugger;
    return  await this.http.post(this.endPointApi , post).toPromise<any>();
  }

 async deleteItem(id: number): Promise<Suppliers>{
    return this.http.delete(this.endPointApi  + id).toPromise<any>();
  }

  async updateItem(post: any, id: number): Promise<Suppliers>{
    return this.http.put(this.endPointApi  + id, post).toPromise<any>();
  }
  async PutSupplier2(formData:FormData){
    debugger
    return await this.http.put(this.endPointApi,formData).pipe();
  }
  async postSupplier2(formData:FormData){
    debugger
    return await this.http.post(this.endPointApi,formData).pipe();
  }

}
