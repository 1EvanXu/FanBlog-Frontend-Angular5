import { Injectable } from '@angular/core';
import {of} from 'rxjs/observable/of';
import {CATEGORIES, LATEST_ARTICLES, POPULAR_ARTICLES} from '../mock-data/side-info';
import {Observable} from 'rxjs/Observable';
import {SideInformation} from '../components/side-info/side-info.component';
import {delay} from 'rxjs/operators';


@Injectable()
export class SidebarService {

  constructor() { }
  getLatestArticles(): Observable<SideInformation[]> {
    return of(LATEST_ARTICLES).pipe(delay(1000));
  }
  getPopularArticles(): Observable<SideInformation[]>  {
    return of(POPULAR_ARTICLES).pipe(delay(1000));
  }
  getCategories(): Observable<SideInformation[]> {
    return of(CATEGORIES).pipe(delay(1000));
  }

}
