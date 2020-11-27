import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private userService: UserService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        if(req.headers.get('noauth')) return next.handle(req.clone());
        return next.handle(req.clone({
            headers: req.headers.set('Authorization', 'Bearer '+this.userService.getToken())
        })).pipe( tap(
            event => {}, 
            err => {
                if(!err.error.auth ){
                    this.router.navigate(['login']);
                }
            } 
        )); 
    }
}