import {Component, Input, OnInit} from '@angular/core';
import {PublishedArticleItem} from '../../data-model/article-item';


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
  @Input() articlesList: Array<PublishedArticleItem>;
  constructor() { }

  ngOnInit() {
  }
}
