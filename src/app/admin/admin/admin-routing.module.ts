import { EmployeesComponent } from './employees/employees.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
const routes: Routes = [

  {
    path:'',
    redirectTo:'Orders',
    pathMatch:'full'
  },
  {
    path:'',
    component:AdminLayoutComponent,
    children:[

       
        {
          path: 'Orders',
          component:OrdersComponent

        },
        {
          path: 'Users',
          component:UsersComponent

        },
        {
          path: 'Products',
          component:ProductsComponent

        }
        ,
        {
          path: 'Suppliers',
          component:SuppliersComponent

        }
        ,        {
          path: 'Categories',
          component:CategoriesComponent

        }        ,        {
          path: 'Employees',
          component:EmployeesComponent

        }
        ,        {
          path: 'supplier',
          component:SuppliersComponent

        }






        // {
        //   path: 'orders',
        //   component:OrdersComponent
        // },{
        //   path: 'users',
        //   component:UsersComponent
        // },{
        //   path: 'workers',
        //   component:WorkersComponent
        // },
        // {
        //   path: 'account',
        //   component:AccountComponent
        // },{
        //   path: 'categories',
        //   component:CategoriesEditorComponent
        // },{
        //   path: 'products',
        //   component:ProductsEditorComponent
        // },


    ]


 }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
