import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleSideBarService {


  isShow:boolean=false;



  changeIsShow(){
    this.isShow = !this.isShow;
  }
  constructor() { }
}
