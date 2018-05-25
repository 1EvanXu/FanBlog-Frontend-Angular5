import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nz-breadcrumb style="margin:12px 0;">
      <nz-breadcrumb-item>
        <a routerLink="articles">Home</a>
      </nz-breadcrumb-item>
      <nz-breadcrumb-item>Article</nz-breadcrumb-item>
      <nz-breadcrumb-item>Content</nz-breadcrumb-item>
    </nz-breadcrumb>
  `,
  styles: [],
})
export class BreadcrumbComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
