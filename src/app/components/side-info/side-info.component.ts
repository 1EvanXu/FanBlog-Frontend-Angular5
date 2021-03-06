import {Component, Input, OnInit} from '@angular/core';
import {SideInformation} from '../../data-model/side-information';

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
          <a href="{{baseHref + info.id.toString()}}">{{info.title}}</a>
          <span *ngIf="info.number" style="float: right">{{info.number}}</span>
        </p>
      </ng-template>
    </nz-card>
  `,
  styles: [
    `
      a:link {color:black;}    /* 未被访问的链接 */
      a:hover {color: dodgerblue;}   /* 鼠标指针移动到链接上 */
    `,
    `
      .side-info {
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
  @Input() baseHref: string;
  @Input() infos: Array<SideInformation>;
  @Input() loading: boolean;
  constructor() {
  }

  ngOnInit() {
  }

}


