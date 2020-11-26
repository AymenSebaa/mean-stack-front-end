import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { slideInOutAnimation } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'mean-crud';
  mediaSub!: Subscription;
  constructor(
    private mediaObserver: MediaObserver
  ){}

    ngOnInit(){
      this.mediaSub = this.mediaObserver.asObservable().pipe( 
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
       ).subscribe( (change: MediaChange) => {
        console.log(change);
      })
    }

    ngAfterViewInit(){

    }

    ngOnDestroy(){
      this.mediaSub.unsubscribe();
    }
}
