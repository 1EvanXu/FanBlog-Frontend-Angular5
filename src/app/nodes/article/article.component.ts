import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div nz-col [nzSm]="24" [nzMd]="1">
      <div style="padding: 3px;margin-top: 200px">
        <div style="margin-bottom: 8px">
          <button nz-button [nzType]="'default'" [nzShape]="'circle'">
            <i class="anticon anticon-like-o"></i>
          </button>
        </div>
        <div style="margin-bottom: 8px">
          <button nz-button [nzType]="'default'" [nzShape]="'circle'">
            <i class="anticon anticon-message"></i>
          </button>
        </div>
      </div>
    </div>
    <div nz-col [nzSm]="20" [nzMd]="17">
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
