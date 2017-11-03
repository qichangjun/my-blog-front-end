/**
 * Created by zzd on 17/5/17.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
declare var Cookies:any;
@Injectable()

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (Cookies.getJSON('current_user_token')) {
      return true;
    } else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
