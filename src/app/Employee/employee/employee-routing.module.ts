import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeLayoutComponent } from './employee-layout/employee-layout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'',
    component:EmployeeLayoutComponent,
    children:[

        {
          path: 'home',
          component:HomeComponent

        },
        // {
        //   path: 'Categories',
        //   component:CategoriesEditorComponent

        // },
        // {
        //   path: 'Products',
        //   component:ProductsEditorComponent

        // },
        // {
        //   path: 'account',
        //   component:AccountComponent

        // }
        // {
        //   path: 'orders',
        //   loadChildren: () => import('../../pages/orders/orders.module').then(m => m.OrdersModule)
        // },

    ]
  }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
