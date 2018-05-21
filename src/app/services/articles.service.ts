import { Injectable } from '@angular/core';
import {ARTICLE_ITEMS, ArticleItem} from '../mock-data/article-items';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {delay} from 'rxjs/Operators';


@Injectable()
export class ArticlesService {
  constructor() { }
  getAllArticles(): Observable<ArticleItem[]> {
    return of(ARTICLE_ITEMS).pipe(delay(2000));
  }
}
