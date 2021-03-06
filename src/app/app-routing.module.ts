import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { EmployeeComponent } from './employee/employee.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product/product.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'employee', component: EmployeeComponent },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductListComponent },
  { path:  '', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
