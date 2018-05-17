import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-info',
  template: `
    <nz-card style="width:300px;margin-bottom: 10px"  [nzLoading]="false" nzTitle="title" nzExtra="extra">
      <p *ngFor="let info of infos">
        <a href="{{info.link}}">{{info.title}}</a>
        <span *ngIf="info.score" style="float: right">{{info.score}}</span>
      </p>
    </nz-card>
    <ng-template #title>
      {{infoTitle}}
    </ng-template>
    <ng-template #extra *ngIf="extra">
      <a href="{{extraUrl}}">{{extra}}</a>
    </ng-template>
  `,
  styles: [
    `
      a:link {color:black;}    /* 未被访问的链接 */
      a:visited {color:darkgray} /* 已被访问的链接 */
      a:hover {color: dodgerblue;}   /* 鼠标指针移动到链接上 */
    `,
  ]
})
export class SideInfoComponent implements OnInit {

  @Input() infoTitle: string;
  @Input() extra: string;
  @Input() extraUrl: string;
  @Input() infos: Array<SideInformation>;

  constructor() {
    this.infos = sideInformations;
  }

  ngOnInit() {
  }

}

export class SideInformation {
  title: string;
  link: string;
  score: number;

  constructor(title: string, link: string, score: number) {
    this.title = title;
    this.link = link;
    this.score = score;
  }
}

const sideInformations = [
  new SideInformation('JAVA', '#', 12),
  new SideInformation('Python', '#', 9),
  new SideInformation('TypeScripts', '#', 5),
  new SideInformation('Angular', '#', 7),
  new SideInformation('HTML', '#', 4)
];
