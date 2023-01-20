import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private authService: AuthService) { 
    if(this.userService.user == null) {
      this.authService.getAuthState().subscribe((user) => {
        if (user) {
          this.userService.user = user;
          // localStorage.setItem('user', JSON.stringify(user));
          // this.userService.createUser(user).subscribe(user => user);
        }
      });
    }
  }
  ngOnInit(): void {
    this.userService.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.getUserById(this.userService.user.uid).subscribe(user => {
      if(user != null){
        this.userService.currentUserInfo = user;
      }
    });
  }
  
  title = 'client';
}
