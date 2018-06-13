import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog',
  template: `
    <nz-layout class="layout">
      <nz-header style="overflow:hidden;">
        <div>
          <ul nz-menu [nzTheme]="'light'" [nzMode]="'horizontal'" style="line-height: 63px;">
            <li>
              <img class="logo" src="../assets/logo.png">
            </li>
            <li nz-menu-item>About</li>
            <li nz-menu-item style="float: right">
              <span>Login Via<i class="anticon anticon-github" style="font-size: 20px; margin-left: 10px"></i></span>
            </li>
            <li>
              <nz-input [nzType]="'search'" style="width: 180px;margin-left: 100px"></nz-input>
            </li>
          </ul>
        </div>
      </nz-header>
      <nz-content style="padding:0 30px;">
        <div nz-row [nzGutter]="5">
          <div nz-col [nzOffset]="4" [nzSm]="24" [nzMd]="16">
            <app-breadcrumb></app-breadcrumb>
          </div>
        </div>
        <div nz-row>
          <div nz-col [nzOffset]="3" [nzSm]="24" [nzMd]="18">
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
        Evan.Xu © 2018 Powered By Angular5, AliCloud NG-ZORRO
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
    a:visited {color:purple} /* 已被访问的链接 */
    a:hover {color: dodgerblue;} /* 鼠标指针移动到链接上 */
    a {
      text-decoration: none;
    }

  `]
})
export class BlogComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.children);
  }

}
