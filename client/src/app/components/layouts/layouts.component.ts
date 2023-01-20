import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  user!: User | null;
  constructor(private authService: AuthService,
    private userService: UserService
    ) {
    
   }

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        // this.userService.createUser(user).subscribe(user => user);
      }
    });
  }

}
