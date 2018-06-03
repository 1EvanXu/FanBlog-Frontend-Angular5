import { Injectable } from '@angular/core';
import {ARTICLE_ITEMS, ARTICLE_ITEMS_1, ARTICLE_ITEMS_2, ARTICLE_ITEMS_3} from '../mock-data/article-items';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {ArticleItem} from '../data-model/article-item';
import {delay} from 'rxjs/operators';


@Injectable()
export class ArticlesService {
  constructor() { }

  /*
  * return: Observable<{'ArticleItems': ArticleItem[], 'totalNumber': number}>
  * */
  getAllArticles(pageIndex: number): Observable<Data> {
    switch (pageIndex) {
      case 1: return of({articleItems: ARTICLE_ITEMS_1, totalNumber: 18}).pipe(delay(2000));
      case 2: return of({articleItems: ARTICLE_ITEMS_2, totalNumber: 18}).pipe(delay(2000));
      case 3: return of({articleItems: ARTICLE_ITEMS_3, totalNumber: 18}).pipe(delay(2000));
    }
    return of({articleItems: ARTICLE_ITEMS, totalNumber: 6});
  }
  getArticlesByCategory(categoryId: number, pageIndex: number): Observable<Data> {
    switch (pageIndex) {
      case 2: return of({articleItems: ARTICLE_ITEMS_2, totalNumber: 12, categoryName: 'category1'}).pipe(delay(2000));
      case 1: return of({articleItems: ARTICLE_ITEMS_3, totalNumber: 12, categoryName: 'category2'}).pipe(delay(2000));
    }
  }
  getArticlesBySearch(keywords: string, pageIndex: number): Observable<Data> {
    return of({articleItems: ARTICLE_ITEMS, totalNumber: 6});
  }
}

class Data {
  articleItems: ArticleItem[];
  totalNumber: number;
  categoryName?: string;
}
