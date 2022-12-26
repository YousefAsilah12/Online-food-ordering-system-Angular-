import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmintokenGetter, tokenGetter } from 'src/app/app.module';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  UserFoundInDb=false;
  IsLogged_in=false;
  endPointApi="https://localhost:44318/api/Customers/auth";

 // user_logged_In_Id:number;


  constructor(private http:HttpClient,
              private router:Router
             ) {
    this.IsLogged_in=sessionStorage.getItem('IsLogged_in')?true:false;
  }

  navigateToLogin(){
    this.router.navigate(['./login'])
  }
  async doLogin(data)
  {
     this.IsLogged_in=true;
    //  localStorage.setItem('IsLogged_in',String(this.IsLogged_in))

    // this.IsLogged_in=true;
    // localStorage.setItem('IsLogged_in',String(this.IsLogged_in))
    let headers = new HttpHeaders().append(
      'Content-Type',
      'application/json;charset=utf-8'
    );
      return  await this.http.post("https://localhost:44318/api/Customers/auth",data,{responseType: 'text' }).toPromise<any>();

  }
  async AdminLogin(data)
  {
     this.IsLogged_in=true;
    //  localStorage.setItem('IsLogged_in',String(this.IsLogged_in))

    // this.IsLogged_in=true;
    // localStorage.setItem('IsLogged_in',String(this.IsLogged_in))
    let headers = new HttpHeaders().append(
      'Content-Type',
      'application/json;charset=utf-8'
    );
      return  await this.http.post("https://localhost:44318/api/Employees/auth",data,{responseType: 'text' }).toPromise<any>();

  }
  public isAuthenticated(): boolean {
   if (tokenGetter()!=null) {
    return true
   }
   return false;
  }

  public AdminIsAuthenticated(): boolean {
    if (AdmintokenGetter()!=null) {
     return true
    }
    return false;
   }

  doLogout(){
    this.IsLogged_in=false;
    // localStorage.setItem('IsLogged_in',String(this.IsLogged_in))
    sessionStorage.removeItem('Token');
    this.router.navigate(['./login'])

  }
  AdmindoLogout(){
    this.IsLogged_in=false;
    sessionStorage.removeItem('AdminToken');
    this.router.navigate(['./login/AdminLogin'])

  }

  async CheckUser(SentUser: Auth): Promise<Auth>{
    //debugger;
    return  await this.http.post(this.endPointApi , SentUser).toPromise<any>();
  }

  async CustomerForgetPassword(email:string){
    debugger
    return await this.http.post("https://localhost:44318/api/Customers/ForgetPassword/"+email,email).pipe();
  }



}
