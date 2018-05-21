import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-info',
  template: `
    <nz-card class="side-info" [nzNoHovering]="true"  [nzLoading]="loading">
      <ng-template #title>
        {{infoTitle}}
      </ng-template>
      <ng-template *ngIf="extraTitle" #extra>
        <a href="{{extraUrl}}">{{extraTitle}}</a>
      </ng-template>
      <ng-template #body>
        <p *ngFor="let info of infos">
          <a href="{{info.link}}">{{info.title}}</a>
          <span *ngIf="info.score" style="float: right">{{info.score}}</span>
        </p>
      </ng-template>
    <nz-card style="width:300px;margin-bottom: 10px"  [nzLoading]="false" nzTitle="title" nzExtra="extra">
      <p *ngFor="let info of infos">
        <a href="{{info.link}}">{{info.title}}</a>
        <span *ngIf="info.score" style="float: right">{{info.score}}</span>
      </p>
  `,
  styles: [
    `
      a:link {color:black;}    /* 未被访问的链接 */
      a:visited {color:darkgray} /* 已被访问的链接 */
      a:hover {color: dodgerblue;}   /* 鼠标指针移动到链接上 */
    `,
    `
      :host .side-info {
        width:300px;
        margin-bottom: 10px;
        margin-left: 5px
      }
    `
  ]
})
export class SideInfoComponent implements OnInit {

  @Input() infoTitle: string;
  @Input() extraTitle: string;
  @Input() extraUrl: string;
  @Input() infos: Array<SideInformation>;
  @Input() loading: boolean;
  constructor() {
  }

  ngOnInit() {
  }

}

export class SideInformation {
  title: string;
  link: string;
  score?: number;

  constructor(title: string, link: string, score?: number) {
    this.title = title;
    this.link = link;
    this.score = score;
  }
}

