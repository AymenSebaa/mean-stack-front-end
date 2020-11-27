import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/route-animations';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class ProfileComponent implements OnInit {
  user: User = new User('', '', '');
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.profile().subscribe(
      res => {
        console.log('user:', res);
        this.user = res as User;
      },
      err => {
        console.log('error:', err);
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['login']);
  }

}
