import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct = (): Observable<any> => {
    return this.http.get(`${environment.API_Url}/products`);
  }
  createProduct = (data:any): Observable<any> => {
    return this.http.post(`${environment.API_Url}/products`,data ,{responseType: 'blob'});
  }
  updateProduct = (data:any,id:number): Observable<any> => {
    return this.http.patch(`${environment.API_Url}/products/id/${id}`,data, {responseType: 'blob'});
  }
  deleteProduct = (id:number): Observable<any> => {
    return this.http.delete(`${environment.API_Url}/products/id/${id}`, {responseType: 'blob'});
  }
  getProduct = (id:number): Observable<any> => {
    return this.http.get(`${environment.API_Url}/products/id/${id}` ,{responseType: 'json'});
  }
  uploadFile(data:any){
    const formData = new FormData(); 
    formData.append("image", data);
    return this.http.post(`${environment.FILE_Url}/uploadImage`,formData,{responseType: 'json'});
  }
}
