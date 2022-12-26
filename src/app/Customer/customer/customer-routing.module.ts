import { SideBarLayoutComponent } from './side-bar-layout/side-bar-layout.component';
import { AuthGuard } from './../../shared/guards/auth.guard';
import { ProductsComponent } from './products/products.component';
import { CustomerlayoutComponent } from './customerlayout/customerlayout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AccountEditComponent } from './account-edit/account-edit.component';

const routes: Routes = [ {
  path:'',
  redirectTo:'home',
  pathMatch:'full'
},
{
  path:'',
  component:CustomerlayoutComponent,
  children:[
       {path:'home',component:HomeComponent},
       {path:'products',component:ProductsComponent},
       {path:'Categories',component:CategoriesComponent},
      // {path:'Account',component:AccountComponent},
      // {path:'Cart',component:CartComponent},
       {path:'ProductDetails/:Id',component:ProductDetailsComponent},
       {path:'sideBarLayout',component:SideBarLayoutComponent,outlet:"child1"},

      ]
    },
    {
      canActivate:[AuthGuard],
      path:'',
      component:CustomerlayoutComponent,
      children:[
           {path:'Account',component:AccountComponent},
           {path:'Account-edit',component:AccountEditComponent},
           {path:'Cart',component:CartComponent},
          ]
        },

    ];


//       {
//         path: 'home',
//         loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule)
//       },
//       {
//         path: 'orders',
//         loadChildren: () => import('../../pages/orders/orders.module').then(m => m.OrdersModule)
//       },

//   ]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
