import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-image-drag',
  templateUrl: './image-drag.component.html',
  styleUrls: ['./image-drag.component.css']
})
export class ImageDragComponent implements OnInit {

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

  dragHandler(event: any, isDragged: any){
    var files;
    if(isDragged){
      files = event.dataTransfer.files;
    } else {
      files = event.target.files;
    }
    if(files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      console.log('image-drag', files[i]);
      this.productService.addImage(files[i]);
    }
  }

  dragzoneActive = false;

  @HostListener('dragover', ['$event']) onDragOver(e: { preventDefault: () => true; stopPropagation: () => true; }){
    e.preventDefault();
    e.stopPropagation();
    this.dragzoneActive = true;
    // console.log('dragover');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(e: { preventDefault: () => true; stopPropagation: () => true; }){
    e.preventDefault();
    e.stopPropagation();
    this.dragzoneActive = false;
    // console.log('dragLeave');
  }


  @HostListener('drop', ['$event']) onDrop(e: { preventDefault: () => true; stopPropagation: () => true; }){
    e.preventDefault();
    e.stopPropagation();
    // console.log('drop', e);
    this.dragzoneActive = false;
    this.dragHandler(e, true);
  }

}
