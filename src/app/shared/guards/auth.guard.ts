import { Auth } from 'src/app/shared/models/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,
              private router:Router){


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // console.log(this.auth.IsLogged_in)
    // if ( this.auth.IsLogged_in==true) {
    //   return  this.auth.IsLogged_in;
    // }
    // else{
    //   // this.router.navigate(['./login'])
    //   // alert('you have to enter valid user name and  password ! ')

    // }
    return this.auth.isAuthenticated();
  }

}
