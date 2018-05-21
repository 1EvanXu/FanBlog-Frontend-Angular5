import { Injectable } from '@angular/core';
import {of} from 'rxjs/observable/of';
import {CATEGORIES, LATEST_ARTICLES, POPULAR_ARTICLES} from '../mock-data/side-info';
import {delay} from 'rxjs/operators';


@Injectable()
export class SidebarService {

  constructor() { }
  getLatestArticles() {
    return of(LATEST_ARTICLES).pipe(delay(1000));
  }
  getPopularArticles() {
    return of(POPULAR_ARTICLES).pipe(delay(1000));
  }
  getCategories() {
    return of(CATEGORIES).pipe(delay(1000));
  }

}
