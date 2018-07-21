import { Injectable } from '@angular/core';
import {ARTICLE_ITEMS, ARTICLE_ITEMS_1, ARTICLE_ITEMS_2, ARTICLE_ITEMS_3} from '../mock-data/article-items';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {delay} from 'rxjs/operators';
import {PublishedArticleItem, PublishedArticleItemCollection} from '../data-model/publised-article-item';
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

