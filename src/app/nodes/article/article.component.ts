import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div nz-col [nzSm]="24" [nzMd]="1">
      <app-side-tool-kits></app-side-tool-kits>
    </div>
    <div nz-col [nzSm]="20" [nzMd]="17" style="min-height:800px">
      <app-article-content></app-article-content>
      <app-comment></app-comment>
      <app-commentary></app-commentary>
    </div>
  `,
  styles: []
})
export class ArticleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
