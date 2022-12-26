import { AdminGuardGuard } from './shared/guards/admin-guard.guard';
import { SidebarModule } from 'primeng/sidebar';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'Customer',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./Auth/auth/auth.module').then(m => m.AuthModule)
  },

  {
    canActivate:[AdminGuardGuard],
   path: 'admin',
   loadChildren: () => import('./admin/admin/admin.module').then(m => m.AdminModule)

 },
 {
  //canActivate:[AuthGuard],
  path: 'Customer',
  loadChildren: () => import('./Customer/customer/customer.module').then(m => m.CustomerModule)

},
 {
   // canActivate:[AuthGuard],
   path: 'employee',
   loadChildren: () => import('./Employee/employee/employee.module').then(m => m.EmployeeModule)

 },
 {
  // canActivate:[AuthGuard],
  path: 'sidebar',
  loadChildren: () => import('./sideBar/side-bar/side-bar.module').then(m => m.SideBarModule)

},
{
  path:'notFound',
  component:NotFoundComponent
},


 {
   path:'**',
   component:NotFoundComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
