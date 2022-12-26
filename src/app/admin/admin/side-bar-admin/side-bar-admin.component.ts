import { Employee } from './../../../shared/models/employee';
import { AdminService } from './../../../shared/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ToggleSideBarService } from 'src/app/shared/services/toggle-side-bar.service';

@Component({
  selector: 'app-side-bar-admin',
  templateUrl: './side-bar-admin.component.html',
  styleUrls: ['./side-bar-admin.component.css']
})
export class SideBarAdminComponent implements OnInit {
  isShown:boolean;
  visibleSidebar1
  admin:Employee
  constructor(private toggle:ToggleSideBarService,
    private AdminService:AdminService) { }

 async ngOnInit() {
  this.isShown=this.toggle.isShow;

     this.admin = await this.AdminService.getAdmin();
  }

}
