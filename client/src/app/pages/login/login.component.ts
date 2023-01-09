import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    
  }

  // createUser() {
  //   this.userService.createUser(credential.user).subscribe((user) => {});
  // }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe((idToken) => {
        this.toastrService.show('Success', 'Login successfully!!', {
          status: 'success',
        });
        this.router.navigate(['/']);

    });
  }
}
