import { Employee } from './../models/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  base="https://localhost:44318/api/Employees/";

  constructor(
    private http:HttpClient
  ) { }


  async getAdmin(): Promise<any>{
    let res :Employee;
    let headers = new HttpHeaders().append('Authorization', sessionStorage.getItem('AdminToken') );
    return await this.http.get(this.base+'1',{headers:headers}).toPromise<any>();
    }

}
