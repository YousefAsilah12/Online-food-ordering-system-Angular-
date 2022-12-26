import { Cart } from './../models/cart';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartId;
  constructor(private http: HttpClient) { }
  public endPointApi = 'https://localhost:44318/api/Carts/';

  async getSingleItem(id: number): Promise<Cart>{
    return this.http.get(this.endPointApi + id).toPromise<any>();
  }

  async getAll(): Promise<Array<Cart>>{
    return this.http.get(this.endPointApi ).toPromise<any>();
  }

  async addItem(post: any): Promise<Cart>{
    debugger;
    return  await this.http.post(this.endPointApi , post).toPromise<any>();
  }

 async deleteItem(id: number): Promise<Cart>{
    return this.http.delete(this.endPointApi  + id).toPromise<any>();
  }

  async updateItem(post: any, id: number): Promise<Cart>{
    return this.http.put(this.endPointApi  + id, post).toPromise<any>();
  }
}
