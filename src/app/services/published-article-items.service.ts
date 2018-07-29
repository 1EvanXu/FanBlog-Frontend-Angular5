import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PublishedArticleItemCollection} from '../data-model/publised-article-item';
import {PublishedArticlesItemsApiClient} from '../apis/published-article-items.api.service';


@Injectable()
export class PublishedArticleItemsService {
  constructor(private _apiClient: PublishedArticlesItemsApiClient) { }

  getAllArticles(pageIndex: number): Observable<PublishedArticleItemCollection> {

    return this._apiClient.getAllPublishedArticleItems(pageIndex);
  }
  getArticlesByCategory(categoryId: number, pageIndex: number): Observable<PublishedArticleItemCollection> {

    return this._apiClient.getPublishedArticleItemsByCategory(categoryId, pageIndex);
  }
  // getArticlesBySearch(keywords: string, pageIndex: number): Observable<PublishedArticleItemCollection> {
  //   return ;
  // }
}

