import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-management',
  template: `
    <nz-layout class="layout">
      <nz-header>
        <div style="vertical-align: center; display: inline-block">
          <img class="logo" src="../assets/logo.png">
          <span style="font-size: 20px; font-weight: bold">Management</span>
        </div>
        <div style="display: inline-block;">
          <button nz-button (click)="writeArticle()">
            <span><i class="anticon anticon-edit"></i><span style="margin-left: 5px">Write Article</span></span>
          </button>
        </div>
        <div style="padding: 10px;float: right;">
          <a>
            <nz-avatar nzIcon="user"></nz-avatar>
          </a>
        </div>
      </nz-header>
      <nz-content style="padding:60px 50px;">
        <nz-layout style="padding:24px 0px; background: #fff;">
          <nz-sider [nzWidth]="230" style="background:#fff">
            <ul nz-menu [nzMode]="'inline'" style="height:100%">
              <li nz-submenu [nzOpen]="true">
                <span title class="management-menu-title"><i class="anticon anticon-file-text"></i>Articles Management</span>
                <ul>
                  <li nz-menu-item><a [routerLink]="['/management/articles/published']">Published Articles</a></li>
                  <li nz-menu-item><a [routerLink]="['/management/articles/draft']">Drafts</a></li>
                  <li nz-menu-item><a [routerLink]="['/management/articles/deleted']">Deleted Articles</a></li>
                </ul>
              </li>
              <li nz-menu-item>
                <span title class="management-menu-title">
                  <a [routerLink]="['/management/categories']">
                    <i class="anticon anticon-tags"></i>Category Management
                  </a>
                </span>
              </li>
            </ul>
          </nz-sider>
          <nz-content style="padding: 24px; min-height: 500px;">
            <router-outlet></router-outlet>
          </nz-content>
        </nz-layout>
      </nz-content>
      <nz-footer style="text-align: center;">Ant Design ©2017 Implement By Angular</nz-footer>
    </nz-layout>
  `,
  styles  : [
    `:host ::ng-deep .logo {
      width: 120px;
      height: 31px;
      border-radius: 6px;
      margin: 16px 10px 16px 0;
      float: left;
    }
    :host ::ng-deep .ant-layout-header {
      background: white;
    }
      .management-menu-title {
        font-size: 14px;
      }
    a {
      text-decoration: none;
      color: gray;
    }
    `],
})
export class ManagementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  writeArticle() {
    this.router.navigate(['/editor/article/new']);
  }

}
