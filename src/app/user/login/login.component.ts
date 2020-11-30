import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { slideDownAnimation } from 'src/app/route-animations';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideDownAnimation],
  host: { '[@slideDownAnimation]': '' }
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.userService.isloggedIn()) this.router.navigate(['product']);
  }

  hide = true;
  matcher = new MyErrorStateMatcher();
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      //Validators.pattern('\^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/')
    ])
  });

  serverError: any = {
    email: { inValid: false, message: '' },
    password: { inValid: false, message: '' },
    other: { inValid: false, message: '' }
  };
  onSubmit(form: FormGroupDirective) {
    this.userService.authenticate(this.loginForm.value).subscribe(
      (res: any) => {
        this.userService.saveToken(res.token);
        this.userService.isloggedIn();
        this.router.navigate(['profile']);
        this.openSnackBar("Login was successful", "OK");
        form.resetForm();
      },
      (err) => {
        let name: any = err.error.name;
        if (!name) {
          this.openSnackBar("Faild to connect to server", "OK");
          return;
        }
        this.serverError[name].inValid = true;
        this.serverError[name].message = err.error.message;
        this.loginForm.controls[name]?.setErrors({ 'invalid': true });
      }
    );
  }

  openSnackBar(msg: string, diss: string, dur?: number, hPos?: any, vPos?: any) {
    this._snackBar.open(msg, diss, {
      duration: dur || 2000,
      horizontalPosition: hPos || 'center',
      verticalPosition: hPos || 'bottom',
    });
  }

  redirectToRegister() {
    this.router.navigate(['signup']);
  }

}
