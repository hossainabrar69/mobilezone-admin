import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  selectedFile!: File;
  id: number;
  photo!:string | ArrayBuffer | File;
  constructor(
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.productForm = new FormGroup({
      product_id: new FormControl(''),
      product_name: new FormControl(''),
      model: new FormControl(''),
      details: new FormControl(''),
      brand: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if(this.id){
    this.getProductDetails()
    }
  }
  getProductDetails(){
    this.productService.getProduct(this.id).subscribe((r) => {
      this.productForm.patchValue(r);
      this.photo = `${environment.FILE_Url}/${r.image}`
    });  
  }
  onSubmit() {
   if(this.id){
   this.updateProduct()
   }else{
   this.createProduct();
   }
  }
  createProduct(){
    const params = this.productForm.value;
    this.uploadFile().then(() => {
      this.productService.createProduct(this.productForm.value).subscribe((r) => {
        this.router.navigate(['/products/list']);
      });
    });
  }
  updateProduct(){
    this.uploadFile().then(() => {
      this.productService.updateProduct( this.productForm.value,this.id).subscribe((r) => {
        this.router.navigate(['/products/list']);
      });
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.photo = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
  }
  }
  uploadFile() {
    return new Promise((resolve) => {
      if (this.selectedFile) {
        this.productService.uploadFile(this.selectedFile).subscribe(
          (r: any) => {
            this.productForm.controls['image'].setValue(r['path']);
            resolve(true);
          },
          (err) => {
            resolve(true);
          }
        );
      } else [resolve(true)];
    });
  }
}
