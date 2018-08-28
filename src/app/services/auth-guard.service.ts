import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> {
    this.authService.setRedirectUrl(url);
    // console.log(url);
    return this.authService.checkLoggedIn().map(
      r => {
        if (!r) {
          this.router.navigate(['/login'], );
        }
        return r;
      }
    );
  }

}
