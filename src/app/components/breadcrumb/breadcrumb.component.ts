import { Component } from '@angular/core';
import {BreadcrumbService} from '../../services/channel.service';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nz-breadcrumb style="margin:12px 0;">
      <nz-breadcrumb-item>
        <a [routerLink]="['/site']">
          <b><i class="anticon anticon-home"></i>&nbsp;Home</b>
        </a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item *ngFor="let item of breadcrumbItems">{{item}}</nz-breadcrumb-item>
    </nz-breadcrumb>
  `,
  styles: [
    `
      a {
        text-decoration: none;
      }
    `
  ],
})
export class BreadcrumbComponent {
  breadcrumbItems: string[] = [];
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.breadcrumbItems$.subscribe(items => this.breadcrumbItems = items);
  }
}
