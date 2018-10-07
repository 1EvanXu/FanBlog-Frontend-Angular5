import { Component, OnInit } from '@angular/core';
import {IPLocation} from '../../data-model/ip-location';
import {IpQueryService} from '../../services/ip-query.service';


@Component({
  template: `
    <nz-layout style="background: white">
      <nz-header>
        <div>
          <ul nz-menu [nzMode]="'horizontal'" style="line-height: 63px;">
            <li>
              <img class="logo" src="../assets/logo.png">
            </li>
            <li nz-menu-item><a [routerLink]="['/site']"><i class="anticon anticon-home"></i> Home</a></li>
          </ul>
        </div>
      </nz-header>
      <nz-content style="padding:20px 20px;">
        <div style="min-height: 500px; margin: 100px 100px;">
          <div nz-row>
            <div nz-col [nzSpan]="12" [nzOffset]="6" style="text-align: center; font-size: 25px; font-family: 'Microsoft YaHei'">
              <h1 style="margin-bottom: 25px">IP Query</h1>
            </div>
          </div>
          <div nz-row>
            <div nz-col [nzSpan]="12" [nzOffset]="6">
              <nz-input [(ngModel)]="ipAddress" [nzSize]="'large'">
                <ng-template #addOnAfter>
                  <button nz-button [nzType]="'primary'" (click)="doQuery()" [nzLoading]="querying">
                    <span style="margin-left: 10px;margin-right: 10px">Go</span>
                  </button>
                </ng-template>
              </nz-input>
              <p *ngIf="!validIP" style="color: red; margin: 10px 1px;">The format of ip you just input is not correct!</p>
            </div>
          </div>
          <div nz-row *ngIf="result">
            <div nz-col [nzSpan]="12" [nzOffset]="6" class="query-result-container">
              <h2>{{result}}</h2>
            </div>
          </div>
        </div>
      </nz-content>
    </nz-layout>
  `,
  styles: [`
    :host ::ng-deep .ant-layout-header {
      background: #fff;
      overflow:hidden;
      border-bottom: lightgray solid 1px;
    }
    :host ::ng-deep .ant-input {
      height: 38px;
    }
    :host ::ng-deep .ant-input-group-addon {
      padding: 0px 0px;
    }
    :host ::ng-deep .ant-btn {
      height: 36px;
    }
    .logo {
      width: 110px;
      height: 31px;
      border-radius: 6px;
      margin: 16px 30px 16px 50px;
      float: left;
    }
    .query-result-container {
      text-align: center;
      margin-top: 30px; 
      background: #EEEEEE;
      padding: 20px; 
      border-radius: 3px
    }
  `]
})
export class IpQueryComponent {
  querying = false;
  ipAddress: string;
  result: string;
  validIP = true;
  constructor(private _ipQueryService: IpQueryService) { }
  doQuery() {
    this.validIP = this.isValidIPAddress(this.ipAddress);
    if (!this.validIP) {
      return;
    }
    this.querying = true;
     this._ipQueryService.getQueryResult(this.ipAddress.trim()).subscribe(
       (v: IPLocation) => this.result = `The location of ${this.ipAddress} is ${v.country}, ${v.province}, ${v.city}`,
       e => this.result = 'Some error happened!',
       () => this.querying = false
     );
  }

  isValidIPAddress(ip: string): boolean {
    const strings: string[] = ip.trim().split('.');

    if (strings.length !== 4) {
      return false;
    }
    for (let i = 0; i < strings.length; i++) {
      if (strings[i].startsWith('0')) {
        return false;
      }
      if (!/\d{1,3}/.test(strings[i])) {
        return false;
      }
    }
    return true;
  }
}

