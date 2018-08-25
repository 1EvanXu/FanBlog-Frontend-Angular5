import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl = '/site';

  constructor(private router: Router, private messageService: NzMessageService) {}

  login() {
    console.log(`IsLoggedIn: ${this.isLoggedIn}, redirectUrl: ${this.redirectUrl}. Start to login...`);
    this.isLoggedIn = true;

    if (this.isLoggedIn) {
      if (this.redirectUrl === undefined) {
        this.messageService.warning('The redirect url is undefined!');
        return;
      }
      this.router.navigate([this.redirectUrl]);
    }
  }

  logout() {
    this.isLoggedIn = false;
  }
}
