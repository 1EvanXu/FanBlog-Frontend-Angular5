import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  template: `
    <nz-layout class="layout">
      <nz-header>
        <div style="vertical-align: center; display: inline-block">
          <img class="logo" src="../assets/logo.png">
          <span style="font-size: 20px; font-weight: bold">Management</span>
        </div>
          <!--<div style="display: inline-block; padding: 10px; line-height: 60px">-->
            <button nz-button>
              <span><i class="anticon anticon-edit"></i><span style="margin-left: 5px">Write Article</span></span>
            </button>
          <!--</div>-->
          <a style="padding: 10px; display: inline-block; float: right; vertical-align: middle">
            <nz-avatar nzIcon="user"></nz-avatar>
            <span>| Exit</span>
          </a>
      </nz-header>
      <nz-content style="padding:60px 50px;">
        <nz-layout style="padding:24px 0px; background: #fff;">
          <nz-sider [nzWidth]="200" style="background:#fff">
            <ul nz-menu [nzMode]="'inline'" style="height:100%">
              <li nz-menu-item>
                <span title><i class="anticon anticon-file-text"></i>Articles Management</span>
              </li>
              <li nz-menu-item>
                <span title><i class="anticon anticon-tags"></i>Category Management</span>
              </li>
              <li nz-menu-item>
                <span title><i class="anticon anticon-mail"></i>Message</span>
              </li>
            </ul>
          </nz-sider>
          <nz-content style="padding: 24px; min-height: 500px;">
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
    `],
})
export class ManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
