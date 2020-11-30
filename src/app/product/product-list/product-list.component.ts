import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  prorducts: Product[] = [];
  constructor(public productService: ProductService) { }

  categories = [
    { _id: '1', name: 'cars' },
    { _id: '2', name: 'food' },
    { _id: '3', name: 'cloths' },
    { _id: '4', name: 'computers' },
  ];

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (res) => {
        this.prorducts = res as Product[];
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    ); 
  }
  getCategoryName(index:string): string{
    return this.categories[Number(index)-1].name;
  }
}
