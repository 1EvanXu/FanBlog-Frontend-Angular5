import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div style="min-height: 1000px;" nz-col [nzSm]="24" [nzMd]="1">
    </div>
    <div style="min-height: 1000px;" nz-col [nzSm]="20" [nzMd]="17">
      <app-article-content></app-article-content>
      <app-comment></app-comment>
      <app-commentary-list></app-commentary-list>
    </div>
  `,
  styles: []
})
export class ArticleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
