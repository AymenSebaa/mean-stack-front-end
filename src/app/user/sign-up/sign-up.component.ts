import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { User } from '../user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInAnimation, slideDownAnimation, slideInOutAnimation } from 'src/app/route-animations';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted ));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [slideDownAnimation],
  host: { '[@slideDownAnimation]': '' }
})
export class SignUpComponent implements OnInit {
  constructor(public userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  hide = true;
  matcher = new MyErrorStateMatcher();
  signUpForm = new FormGroup({
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
  
  emailServerError: boolean = false;
  emailMessage: string = '';
  onSubmit(form: FormGroupDirective){
    if(this.signUpForm.valid){
      this.userService.register(this.signUpForm.value).subscribe(
        (res) => {
        console.log(res as User);
        this.openSnackBar("Registraton was successful", "OK");
        form.resetForm();
      }, (err) => {
        this.emailServerError = true;
        this.emailMessage = err.error.message;
        this.signUpForm.controls['email'].setErrors({'invalid': true});
        console.log('show email taken', this.signUpForm.controls['email']);
      }
      );
    }    
  }

  openSnackBar(msg: string, diss: string, dur?: number, hPos?: any, vPos?: any) {
    this._snackBar.open(msg, diss, {
      duration: dur || 2000,
      horizontalPosition: hPos || 'center',
      verticalPosition: hPos || 'bottom',
    });
  }
}
