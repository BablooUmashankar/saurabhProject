import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,  } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private _authService:AuthService , private router : Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this._authService.isloggedIn$.pipe(
        map((_isLoggedIn : boolean) => {
          if(!_isLoggedIn){
            this.router.navigate(['auth/login']);
            return true;
          }
    return true;
    })
  )
  }
}
