import { Injectable } from '@angular/core';
import {of} from 'rxjs/observable/of';
import {CATEGORIES, LATEST_ARTICLES, POPULAR_ARTICLES} from '../mock-data/side-info';
import {delay} from 'rxjs/operators';
import {SideInformationApiClient} from '../apis/side-information.api.service';
import {SideInformationCollection} from '../data-model/side-information';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class SidebarService {

  constructor(private _apiClient: SideInformationApiClient) {}
  //
  // getLatestArticles() {
  //   return of(LATEST_ARTICLES).pipe(delay(1000));
  // }
  // getPopularArticles() {
  //   return of(POPULAR_ARTICLES).pipe(delay(1000));
  // }
  // getCategories() {
  //   return of(CATEGORIES).pipe(delay(1000));
  // }
  getLatestArticles(): Observable<SideInformationCollection> {
    return this._apiClient.getLatestArticles();
  }
  getPopularArticles(): Observable<SideInformationCollection> {
    return this._apiClient.getPopularArticles();
  }
  getCategories(): Observable<SideInformationCollection> {
    return this._apiClient.getCategories();
  }

}
