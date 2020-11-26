import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseURL = '/user';
  constructor(private http: HttpClient) { }

  resetUser(){
    return new User('', '' , '');
  }

  register(user: User){
    console.log(user);
    return this.http.post(environment.apiBaseUrl+this.baseURL+'/register', user);
  }

}
  