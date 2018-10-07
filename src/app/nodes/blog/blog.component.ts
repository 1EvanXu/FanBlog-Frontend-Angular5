import { Component, OnInit } from '@angular/core';
import { GithubOAuth2Url } from '../../apis/common-api.config';
import {AuthService} from '../../services/auth.service';
import {User} from '../../data-model/user';

@Component({
  selector: 'app-blog',
  template: `
    <nz-layout class="layout">
      <nz-header style="overflow:hidden;border-bottom: lightgray solid 1px;">
        <div>
          <ul nz-menu [nzTheme]="'light'" [nzMode]="'horizontal'" style="line-height: 63px;">
            <li>
              <img class="logo" src="../assets/logo.png">
            </li>
            <li nz-menu-item><a [routerLink]="['/ip']">IP Query</a></li>
            <li nz-menu-item style="float: right">
              <nz-dropdown *ngIf="user" [nzPlacement]="'bottomCenter'" [nzTrigger]="'click'">
                <nz-avatar nzIcon="user" nz-dropdown [nzSrc]="user.avatarUrl"></nz-avatar>
                <ul nz-menu>
                  <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer">
                      <i class="anticon anticon-user"></i>&nbsp;{{user.name}}</a>
                  </li>
                  <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer" [routerLink]="['/management/']">
                      <i class="anticon anticon-menu-unfold"></i>&nbsp;Management
                    </a>
                  </li>
                  <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer" [routerLink]="['/editor/article/new']">
                      <i class="anticon anticon-edit"></i>&nbsp;Write article
                    </a>
                  </li>
                  <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer" (click)="logout()" >
                      <i class="anticon anticon-logout"></i>&nbsp;Logout
                    </a>
                  </li>
                </ul>
              </nz-dropdown>
              
              <a *ngIf="!user" href="{{authLink}}">Login Via<i class="anticon anticon-github" style="font-size: 20px; margin-left: 10px"></i></a>
            </li>
            <!--<li>-->
              <!--<nz-input [nzType]="'search'" style="width: 180px;margin-left: 100px"></nz-input>-->
            <!--</li>-->
          </ul>
        </div>
      </nz-header>
      <nz-content style="padding:0 20px;">
        <div nz-row [nzGutter]="5">
          <div nz-col [nzOffset]="3" [nzSm]="24" [nzMd]="18">
            <app-breadcrumb></app-breadcrumb>
          </div>
        </div>
        <div nz-row>
          <div nz-col [nzOffset]="2" [nzSm]="24" [nzMd]="20">
            <div style="padding: 10px">
              <div nz-row [nzGutter]="10">
                <router-outlet></router-outlet>
                <div nz-col  [nzSm]="24" [nzMd]="6" style="margin-top: 5px">
                  <nz-affix>
                    <app-sidebar></app-sidebar>
                  </nz-affix>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nz-content>
      <nz-footer style="float: bottom;text-align: center;width: 100%">
        Evan.Xu © 2018 Powered By Angular5, NG-ZORRO
      </nz-footer>
    </nz-layout>
  `,
  styles: [`
    :host ::ng-deep .ant-layout-header {
      background: #fff;
    }
    :host ::ng-deep .logo {
      width: 110px;
      height: 31px;
      /*background: lightgray;*/
      border-radius: 6px;
      margin: 16px 30px 16px 50px;
      float: left;
    }
    a:link {color:black;}    /* 未被访问的链接 */
    a:visited {color:black} /* 已被访问的链接 */
    a:hover {color: dodgerblue;} /* 鼠标指针移动到链接上 */
    a {
      text-decoration: none;
    }

  `]
})
export class BlogComponent implements OnInit {

  authLink = GithubOAuth2Url;

  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUserFromCookie();
  }

  logout() {
    this.authService.logout();
  }

}
