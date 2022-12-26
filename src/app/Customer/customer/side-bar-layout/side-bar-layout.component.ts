import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-layout',
  templateUrl: './side-bar-layout.component.html',
  styleUrls: ['./side-bar-layout.component.scss']
})
export class SideBarLayoutComponent implements OnInit {
  visibleSidebar2;
  public Login:boolean;
  public Register:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }
  RegClick(){
    this.Login=false;
    this.Register=true;

  }
  LogClick(){
    this.Login=true;
    this.Register=false;

  }

}
