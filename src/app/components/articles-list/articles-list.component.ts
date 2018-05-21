import {Component, Input, OnInit} from '@angular/core';
import {ArticleItem} from '../../mock-data/article-items';

@Component({
  selector: 'app-articles-list',
  template: `
    <div nz-row>
      <app-article-item *ngFor="let articleItem of articlesList" [articleItem]="articleItem"></app-article-item>
    </div>
    <div nz-row style="background-color: white;padding: 5px;">
      <div nz-col [nzOffset]="4" [nzSpan]="16" style="text-align: center">
        <nz-pagination [(nzPageIndex)]="currentPage" [nzTotal]="50" [nzSize]="'small'"></nz-pagination>
      </div>
    </div>
  `,
  styles: []
})
export class ArticlesListComponent implements OnInit {
  @Input() articlesList: Array<ArticleItem>;
  currentPage: number;
  constructor() { }

  ngOnInit() {
  }

}
