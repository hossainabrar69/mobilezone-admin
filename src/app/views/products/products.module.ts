import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductRoutingModule } from './product-routing.module'
import { ProductService } from './product.service'
import { TableModule, CardModule ,GridModule , ButtonModule , FormModule ,CarouselModule} from '@coreui/angular'
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    TableModule,
    CardModule,
    DocsComponentsModule,
    GridModule,
    IconModule,
    ButtonModule,
    FormModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule
  ],
  providers:[ProductService]
})
export class ProductsModule { }
