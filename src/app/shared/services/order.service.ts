import { Orders } from './../models/orders';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
orderId;
  constructor(private http: HttpClient) { }
  public endPointApi = 'https://localhost:44318/api/Orders/';

  async getSingleItem(id: number): Promise<Orders>{
    return this.http.get(this.endPointApi + id).toPromise<any>();
  }

  async getAll(): Promise<Array<Orders>>{
    return this.http.get(this.endPointApi ).toPromise<any>();
  }

  async addItem(post: any): Promise<Orders>{
    debugger;
    return  await this.http.post(this.endPointApi , post).toPromise<any>();
  }

 async deleteItem(id: number): Promise<Orders>{
    return this.http.delete(this.endPointApi  + id).toPromise<any>();
  }

  async updateItem(post: any, id: number): Promise<Orders>{
    return this.http.put(this.endPointApi  + id, post).toPromise<any>();
  }

  async SentRecipt(orderId:number){
    debugger
    return await this.http.post("https://localhost:44318/api/Orders/SentRecipt/"+orderId,orderId).pipe();
  }

}
