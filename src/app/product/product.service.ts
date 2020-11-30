import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

export class MyErrorStateMatcher implements MyErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  selectedProduct: Product = this.resetSelectedProduct();

  matcher = new MyErrorStateMatcher();
  productForm = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    category: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required
    ]),
    desc: new FormControl('', [
    ]),
    tags: new FormControl('', [
    ]),
    images: new FormControl('', [
    ]),
  });

  constructor(public http: HttpClient) { }

  imageDisplayVisible = false;
  gallery: String[] = [];
  uploadImages: File[] = [];
  selectedImage: number = -1;
  addImage(image: File) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (_event) => {
      this.uploadImages.push(image);
      this.gallery.push(reader.result as string);
      this.gallery = this.gallery.reverse();
      this.setSelectedImage(0);
      this.imageDisplayVisible = true;
    }
  }
  setSelectedImage(index: number) {
    this.selectedImage = index;
  }
  getSelectedImage(): String {
    if (this.selectedImage < 0) return '';
    return this.gallery[this.selectedImage];
  }
  removeImage(index: number) {
    this.gallery.splice(index, 1);
    if (this.gallery.length === 0) {
      this.imageDisplayVisible = false;
      return this.setSelectedImage(-1);
    }
    this.setSelectedImage(0);
  }

  resetSelectedProduct() {
    return new Product('', '', '', [], '', 0, [], '', new Date());
  }

  createProduct(product: Product) {
    return this.http.post(environment.productUrl, product);
  }

  getProducts() {
    return this.http.get(environment.productUrl);
  }
  updateProduct(product: Product) {
    return this.http.put(environment.productUrl + '/' + product._id, product);
  }
  deleteProduct(product: Product) {
    return this.http.delete(environment.productUrl + '/' + product._id);
  }

  refreshProducts(products?: Product[]) {
    if (products) {
      this.products = products;
      console.log(this.products);
    } else {
      this.getProducts().subscribe((res) => {
        this.products = res as Product[];
      });
    }
  }
}
