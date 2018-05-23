import { Injectable } from '@angular/core';
import {ARTICLE_ITEMS, ARTICLE_ITEMS_1, ARTICLE_ITEMS_2, ARTICLE_ITEMS_3} from '../mock-data/article-items';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {ArticleItem} from '../entities/article-item';


@Injectable()
export class ArticlesService {
  constructor() { }
  getAllArticles(pageIndex: number): Observable<ArticleItem[]> {
    switch (pageIndex) {
      case 1: return of(ARTICLE_ITEMS_1);
      case 2: return of(ARTICLE_ITEMS_2);
      case 3: return of(ARTICLE_ITEMS_3);
    }
    return of(ARTICLE_ITEMS);
  }
}
