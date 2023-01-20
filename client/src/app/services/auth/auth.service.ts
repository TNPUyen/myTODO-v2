import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  UserInfo,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: UserInfo | null;
  userInfo!: UserModel | null;

  constructor(
    private auth: Auth,
    // private router: Router,
    private userService: UserService
  ) {
    authState(this.auth).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
  getAuthState() {
    return authState(this.auth);
  }

  loginWithGoogle() {
    // let user = await signInWithPopup(this.auth, new GoogleAuthProvider());
    // this.router.navigateByUrl('/home');
    // return user;
    return from(
      new Promise<string>(async (resolve, reject) => {
        try {
          let credential = await signInWithPopup(
            this.auth,
            new GoogleAuthProvider()
          );
          // await this.SetUserData(credential.user);
          let idToken = await credential.user.getIdToken();
          this.userService.createUser(credential.user).subscribe((user) => user);

          resolve(idToken);
        } catch {
          reject('Cannot login with google');
        }
      })
    );
  }

  logout() {
    return from(
      new Promise<any>(async (resolve, reject) => {
        try {
          await signOut(this.auth);
          // this.isUserLoggedIn.next(false);
          // this.router.navigateByUrl("/");
          // console.log("out")
          resolve('log out');
        } catch {
          reject('logout fail');
        }
      })
    );
  }
}
