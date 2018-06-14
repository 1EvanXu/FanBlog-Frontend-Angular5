import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PublishedArticle} from '../data-model/published-article';
import {BASE_API_URL} from './common-api.config';
import {PublishedArticleItemCollection} from '../data-model/publised-article-item';

@Injectable()
export class PublishedArticlesItemsClient {
  private _publishedArticlesItemsUrl = BASE_API_URL + 'articles/';

  constructor(private _http: HttpClient) { }

  getAllPublishedArticleItems(pageIndex: number): Observable<PublishedArticleItemCollection> {
    const requestUrl = this._publishedArticlesItemsUrl + `all/p/${pageIndex}`;
    return this._http.get<PublishedArticleItemCollection>(requestUrl);
  }

  getPublishedArticleItemsByCategory(categoryId: number, pageIndex: number): Observable<PublishedArticleItemCollection> {
    const requestUrl = this._publishedArticlesItemsUrl + `category/${categoryId}/p/${pageIndex}`;
    return this._http.get<PublishedArticleItemCollection>(requestUrl);
  }

  getPublishedArticleItemsBySearch(keywords: string, pageIndex: number): Observable<PublishedArticleItemCollection> {
    const requestUrl = this._publishedArticlesItemsUrl + `search/p/${pageIndex}`;
    return this._http.get<PublishedArticleItemCollection>(requestUrl);
  }
}
