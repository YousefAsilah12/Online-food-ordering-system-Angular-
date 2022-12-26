import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ToggleSideBarService } from 'src/app/shared/services/toggle-side-bar.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit ,DoCheck{
shown:boolean
  constructor(private toggle:ToggleSideBarService) { }

  ngOnInit(): void {
     this.shown=this.toggle.isShow;
     console.log(this.shown)

  }
  // ngOnChanges(){
  //   this.shown=this.toggle.isShow;
  //   console.log(this.shown)
  // }
  ngDoCheck(){
    this.shown=this.toggle.isShow;
    console.log(this.shown)

  }
}
