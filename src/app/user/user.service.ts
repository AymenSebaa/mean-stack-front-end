import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseURL = '/user';  
  noAuthHeader = {headers: new HttpHeaders( { 'NoAuth': 'True'} ) };

  constructor(private http: HttpClient) { }

  resetUser(){
    return new User('', '' , '');
  }

  register(user: User){
    return this.http.post(environment.apiBaseUrl+this.baseURL+'/register', user, this.noAuthHeader);
  }
  authenticate(user: User){
    return this.http.post(environment.apiBaseUrl+this.baseURL+'/authenticate', user, this.noAuthHeader);
  }
  profile(){
    return this.http.get(environment.apiBaseUrl+this.baseURL+'/profile'); 
  }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getUserPayLoad(){
    var token = this.getToken();
    if(token){
       var userPayLoad = atob(token.split('.')[1]);
       return JSON.parse(userPayLoad);
    } 
    return null;
  }
  isloggedIn(){
    var userPayLoad = this.getUserPayLoad();
    if(userPayLoad)return userPayLoad.exp / 1000;
    return null;
  }
  deleteToken(){
    localStorage.removeItem('token');
  }

}
  