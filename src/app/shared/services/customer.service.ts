import { CustomerDto } from './../Dto/customer-dto';
import { Customer } from './../models/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  res:any;
  base="https://localhost:44318/api/Customers/";

  constructor(
    private http:HttpClient
  ) { }

  async getSingleItem(id: number): Promise<Customer>{
    return this.http.get(this.base + id).toPromise<any>();
  }
  async getCustomer(): Promise<any>{
  let res :Customer;
  let headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('Token') );
  return await this.http.get(this.base+'1',{headers:headers}).toPromise<any>();
  }

  async getAll(): Promise<any>{
    return this.http.get(this.base).toPromise<any>();
  }

  async postuser(Customer:CustomerDto):Promise<Customer>{
    debugger
    return await this.http.post(this.base,Customer).toPromise<any>();
  }
  async postuser2(formData:FormData){
    debugger
    return await this.http.post(this.base,formData).pipe();
  }


  async PutCustomer(Customer:CustomerDto,id:number):Promise<Customer>{

    return await this.http.put(this.base+id ,Customer).toPromise<any>();
  }

  async PutEmployee2(formData:FormData){
    debugger
    let headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('AdminToken') );
    return await this.http.put(this.base,formData,{headers:headers}).pipe();
  }
  async PutCus3(formData:FormData){
    debugger
    return await this.http.put(this.base,formData).pipe();
  }



  async deleteItem(id: number): Promise<Customer>{
    return this.http.delete(this.base  + id).toPromise<any>();
  }


}
