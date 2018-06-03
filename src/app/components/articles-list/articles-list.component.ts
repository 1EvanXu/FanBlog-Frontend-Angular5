import {Component, Input, OnInit} from '@angular/core';
import {ArticleItem} from '../../data-model/article-item';


@Component({
  selector: 'app-articles-list',
  template: `
    <div nz-row>
      <app-article-item *ngFor="let articleItem of articlesList" [articleItem]="articleItem"></app-article-item>
    </div>
  `,
  styles: []
})
export class ArticlesListComponent implements OnInit {
  @Input() articlesList: Array<ArticleItem>;
  constructor() { }

  ngOnInit() {
  }
}
