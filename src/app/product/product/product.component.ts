import { Component, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Product } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public productService: ProductService, private _snackBar: MatSnackBar) { }
  categories = [
    { _id: '1', name: 'cars' },
    { _id: '2', name: 'food' },
    { _id: '3', name: 'cloths' },
    { _id: '4', name: 'computers' },
  ];

  ngOnInit(): void {
  }

  tagVisible = true;
  tagSelectable = true;
  tagRemovable = true;
  tagAddOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) this.tags.push(value.trim());
    if (input) input.value = '';
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) this.tags.splice(index, 1);
  }

  onSubmit(form: FormGroupDirective) {
    let product = form.value as Product;
    product.tags = this.tags;
    product.images = [];
    product.userId = '1';

    var uploadCount = 0;
    this.productService.uploadImages.map(uploadImage => {
      let formData = new FormData();
      formData.append('image', uploadImage);
      this.productService.http.post(environment.uploadUrl + '/image', formData).subscribe(
        (res: any) => {
          let image = environment.imagesUrl + '/' + res.image;
          product.images.push(image);
          uploadCount += 1;
          console.log(uploadCount + ' image is uploaded');
        },
        (err: any) => {
          console.log(err);
        });
    })

    var timer = setInterval(() => {
      console.log('uploadCount' + uploadCount);
      if (uploadCount === this.productService.uploadImages.length) {
        clearInterval(timer);
        console.log('all ' + this.productService.uploadImages.length + ' have been uploaded');
        this.productService.createProduct(product).subscribe(
          (res: any) => {
            console.log(res);
            form.resetForm();
            this.productService.gallery = [];
            this.productService.uploadImages = [];
            this.openSnackBar(res.title+"was successful added", "OK");
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    }, 300);

  }

  openSnackBar(msg: string, diss: string, dur?: number, hPos?: any, vPos?: any) {
    this._snackBar.open(msg, diss, {
      duration: dur || 2000,
      horizontalPosition: hPos || 'center',
      verticalPosition: hPos || 'bottom',
    });
  }
}
