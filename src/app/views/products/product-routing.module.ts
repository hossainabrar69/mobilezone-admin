import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AuthGuard } from '../../core/guard/auth.guard';
import { ProductListComponent  } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component'
  const routes: Routes = [{
      path: '',
      children: [
          {
          path: 'list',
          component: ProductListComponent,
          data: {
            title: 'Product List',
          },
          canActivate: [AuthGuard] 
          
        },
        {
            path: 'create',
            component: CreateProductComponent,
            data: {
              title: 'Create Product',
            },
            canActivate: [AuthGuard] 
            
        },
        {
            path: 'edit/:id',
            component: CreateProductComponent,
            data: {
              title: 'Update Product',
            },
            canActivate: [AuthGuard] 
            
        }
      ]
    }
  
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductRoutingModule {}
  