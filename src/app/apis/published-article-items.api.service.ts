import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BASE_API_URL} from './common-api.config';
import {PublishedArticleItemCollection} from '../data-model/publised-article-item';
import {BlogResponseResult} from '../data-model/blog-response-result';
import {map} from 'rxjs/operators';

@Injectable()
export class PublishedArticlesItemsApiClient {
  private _baseUrl = BASE_API_URL + 'articles/';

  constructor(private _http: HttpClient) { }

  getAllPublishedArticleItems(pageIndex: number): Observable<PublishedArticleItemCollection> {
    const requestUrl = this._baseUrl + `all/p/${pageIndex}`;
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));

  }

  getPublishedArticleItemsByCategory(categoryId: number, pageIndex: number): Observable<PublishedArticleItemCollection> {
    const requestUrl = this._baseUrl + `category/${categoryId}/p/${pageIndex}`;
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  getPublishedArticleItemsBySearch(keywords: string, pageIndex: number): Observable<PublishedArticleItemCollection> {
    const requestUrl = this._baseUrl + `search/p/${pageIndex}`;
    return this._http.get<PublishedArticleItemCollection>(requestUrl);
  }
}
