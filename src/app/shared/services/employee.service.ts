import { tokenGetter } from 'src/app/app.module';
import { Employee } from './../models/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  base="https://localhost:44318/api/Employees/";
  constructor(
    private http:HttpClient
  ) { }

  async getAll(): Promise<any>{
    return this.http.get(this.base).toPromise<any>();
  }

  async postuser(Employee:any):Promise<Employee>{
    debugger
    return await this.http.post(this.base,Employee).toPromise<any>();
  }
  async postEmp2(formData:FormData){
    debugger
    let headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('AdminToken') );
    return await this.http.post(this.base,formData,{headers:headers}).pipe();
  }


  async PutEmployee(Employee:any,id:number):Promise<Employee>{

    return await this.http.put(this.base+id ,Employee).toPromise<any>();
  }

  async PutEmployee2(formData:FormData){
    debugger
    let headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('AdminToken') );
    return await this.http.put(this.base,formData,{headers:headers}).pipe();
  }

  async deleteItem(id: number): Promise<Employee>{
    return this.http.delete(this.base  + id).toPromise<any>();
  }}
