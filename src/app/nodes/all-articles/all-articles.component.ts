import { Component, OnInit } from '@angular/core';
import {ArticleItem} from '../../mock-data/article-items';
import {ArticlesService} from '../../services/articles.service';

@Component({
  template: `
    <div nz-col [nzSm]="20" [nzMd]="18">
     <app-articles-list [articlesList]="articleItemsList$"></app-articles-list>
    </div>
  `,
  styles: []
})
export class AllArticlesComponent implements OnInit {
  articleItemsList$: ArticleItem[];
  constructor(private articlesService: ArticlesService) {
    this.getArticleItemsList();
  }

  ngOnInit() {
  }
  getArticleItemsList() {
    this.articlesService.getAllArticles().subscribe(itemsList => { this.articleItemsList$ = itemsList; });
  }
}
