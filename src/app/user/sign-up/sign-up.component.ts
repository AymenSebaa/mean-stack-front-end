import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { User } from '../user.model';
import { fadeInAnimation, slideDownAnimation, slideInOutAnimation } from 'src/app/route-animations';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
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
  constructor(public userService: UserService) { }

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
  
  emailError: boolean = false;
  emailMessage: string = '';
  onSubmit(form: FormGroupDirective){
    if(this.signUpForm.valid){
      this.userService.register(this.signUpForm.value).subscribe((res) => {
        console.log(res as User);
        form.resetForm();
      }, (err) => {
        this.emailError = true;
        this.emailMessage = err.error.message;
        
      }
      );
    }    
  }

}
