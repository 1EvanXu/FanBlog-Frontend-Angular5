import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {AuthApiClient} from '../apis/auth.api.service';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import {User} from '../data-model/user';
import {of} from 'rxjs/observable/of';


@Injectable()
export class AuthService {

  private readonly cookieExpireTime = 86400000 * 5;

  constructor(private router: Router,
              private messageService: NzMessageService,
              private authApiClient: AuthApiClient,
              private cookieService: CookieService
  ) {}

  login(userId: number): Observable<boolean> {
    return this.authApiClient.getUser(userId).pipe(map(
      value => {
        if (value) {
          this.cookieService.putObject('user', value, {expires: this.calculateCookieExpiredDate(this.cookieExpireTime)});
          return true;
        }
        return false;
      }
    ));

  }

  logout() {
    const user = this.getUserFromCookie();

    if (user) {
      this.authApiClient.updateUserState(user.id).subscribe(
        value => {
          if (value) {
            this.removeUserFromCookie();
            location.href = '/blog/site';
          }
        }
      );
    }
  }

  checkAllowAccess(): Observable<boolean> {
    const user = this.getUserFromCookie();
    if (user && user.id) {
      console.log(`Checking login state of ${user.name}`);
      return this.authApiClient.checkAdmin(user.id);
    }
    return of(false);
  }


  getUserFromCookie(): User {
    return <User>this.cookieService.getObject('user');
  }

  private removeUserFromCookie() {
    this.cookieService.remove('user');
  }

  setRedirectUrl(url: string) {
    const TwoMinute = 120000;
    this.cookieService.put('redirectTo', url, {expires: this.calculateCookieExpiredDate(TwoMinute)});
  }

  getRedirectUrl(): string {
    return this.cookieService.get('redirectTo');
  }

  private calculateCookieExpiredDate(durationMilliSecond: number): Date {
    const expiredTime = new Date().valueOf() + durationMilliSecond;
    const expiredDate = new Date(expiredTime);
    console.log('Cookie expired date: ' + expiredDate.toISOString());
    return expiredDate;
  }
}
