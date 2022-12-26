import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToggleSideBarService } from 'src/app/shared/services/toggle-side-bar.service';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {
  visibleSidebar1
  constructor(private toggle:ToggleSideBarService,
    private auth:AuthService) { }
  isShow:boolean;
  ngOnInit(): void {
    this.isShow=this.toggle.isShow;
  }
  isShown(){
    this.toggle.changeIsShow();
  }


  LogOut(){
    this.auth.AdmindoLogout();

  }
}
