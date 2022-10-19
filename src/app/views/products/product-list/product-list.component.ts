import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { cilPen, cilTrash } from '@coreui/icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  error: string | undefined;
  isLoading: boolean | undefined;
  productList: any;
  icons = { cilPen, cilTrash };
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.isLoading = true;
    this.productService.getAllProduct().subscribe(
      (r) => {
        this.isLoading = false;
        this.productList = r;
      },
      (err) => {
        if ((err.status = 404)) this.productList = [];
      }
    );
  }
  onDelete(id: number) {
    if (confirm('Are You sure, You want to delete?')) {
      this.productService.deleteProduct(id).subscribe((r) => {
        console.log('delete');
        this.getAllProducts();
      });
    }
  }
}
