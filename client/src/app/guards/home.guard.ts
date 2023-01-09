import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      authState(this.auth).subscribe((state) => {
        if (state) {

          resolve(!state.isAnonymous);
          if(state.isAnonymous){
            this.router.navigate(['/login']);
          }
        } else {
          resolve(false);
          this.router.navigate(['/login']);
        }
      });
    });
  }
  
}
