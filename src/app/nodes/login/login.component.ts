import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {GithubOAuth2Url} from '../../apis/common-api.config';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  template: `
    <div class="login-page-header">
      <img class="logo" src="../assets/logo.png">
    </div>
    <nz-alert *ngIf="errorMsg" [nzType]="'error'" [nzMessage]="'Login failed! ' + errorMsg" [nzShowIcon]="true" [nzCloseable]="true"></nz-alert>
    <nz-alert *ngIf="loginSucceed" [nzType]="'success'" [nzMessage]="'Login succeed!'" [nzShowIcon]="true" [nzCloseable]="true"></nz-alert>
    <div class="login-page-container">
      <table cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <div>
                    <h2 *ngIf="logging" style="color: gray"><i class="anticon anticon-loading anticon-spin"></i>  Logging in ... </h2>
                    <h1 *ngIf="!logging && !loginSucceed">Please login ~ <i class="anticon anticon-smile-o"></i></h1>
                    <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="toLoginViaGithub()" [disabled]="logging">
                      To login via <i class="anticon anticon-github"></i>
                    </button>
                  </div>
                  <p style="margin-top: 20px">
                    <a [routerLink]="['/site']">Back to Home <i class="anticon anticon-arrow-right"></i></a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <footer>
      Evan.Xu © 2018 Powered By Angular5, AliCloud NG-ZORRO
    </footer>
  `,
  styles: [`
    *{
      font-family:"Microsoft Yahei";
      margin:0;font-weight:lighter;
      text-decoration:none;
      text-align:center;
      line-height:2.2em;
    }
    h1 {
      font-size:40px;
      line-height:1em;
      color: #2D2D2D;
    }
    table{
      width:100%;
      height:100%;
      border:0;
    }
    .login-page-container{
      margin-top: 19% ;
    }
    .logo {
      width: 130px;
      height: 40px;
      margin: 12px 30px 12px 50px;
      float: left;
    }
    .login-page-header {
      overflow: auto;
      display: block;
      border-bottom: 1px lightgray solid;
    }

    footer {
      text-align: center;
      width: 100%;
      position: absolute;
      bottom: 0px;
      left: 0px;
      height: 80px;
      padding: 20px;
    }
  `]
})
export class LoginComponent implements OnInit {

  private userId: number;
  errorMsg: string;
  logging = false;
  loginSucceed = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.userId = +param.userId;
        this.errorMsg = param.error;

      }
    );
    if (this.userId) {
      this.logging = true;
      this.authService.login(this.userId).subscribe(
        value => {

          if (value) {
            this.loginSucceed = value;
            let redirectUrl = this.authService.getRedirectUrl();
            redirectUrl = redirectUrl ? redirectUrl : '/site';
            this.router.navigate([redirectUrl]);
          }
        },
        () => { this.loginSucceed = false; this.logging = false; },
        () => this.logging = false
      );
    }
  }

  toLoginViaGithub() {
    this.logging = true;
    location.href = GithubOAuth2Url;
  }

}
