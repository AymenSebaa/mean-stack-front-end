import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout'
import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select'
import {MatChipsModule} from '@angular/material/chips';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './user/profile/profile.component';
import { LoginComponent } from './user/login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product/product.component';
import { ImageDragComponent } from './partials/image-drag/image-drag.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ModalComponent,
    SignUpComponent,
    ProfileComponent,
    LoginComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductComponent,
    ImageDragComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule, MatInputModule, MatButtonModule, MatSnackBarModule,MatDialogModule, MatBadgeModule, MatIconModule, MatTableModule,    MatSelectModule, MatChipsModule, 
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 