import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  template: `
    <div class="login-page-header">
      <img class="logo" src="../assets/logo.png">
    </div>
    <div class="login-page-container">
      <table cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <h1>Please login ~ <i class="anticon anticon-smile-o"></i></h1>
                  <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="toLogin()">
                    To login via <i class="anticon anticon-github"></i>
                  </button>
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
      margin: 16px 30px 16px 50px;
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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  toLogin() {
    this.authService.login();
  }

}
