import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Article} from '../data-model/article';
import {BASE_API_URL, HttpRequestOption} from './common-api.config';
import {map, retry} from 'rxjs/operators';
import {BlogResponseResult} from '../data-model/blog-response-result';

@Injectable()
export class PublishedArticleContentApiClient {
  private articleContentUrl = BASE_API_URL + 'articles/';
  private articleCacheUrl = BASE_API_URL + 'cache/articles/';

  constructor(private _http: HttpClient) { }

  getPublishedArticle(pubId: number): Observable<Article> {
    const requestUrl = this.articleContentUrl + pubId;
    return this._http.get<BlogResponseResult>(requestUrl)
      .pipe(map(value => value.data));
  }

  voteForPublishedArticle(pubId: number): Observable<boolean> {
    const requestUrl = this.articleCacheUrl + pubId + '/vote/';
    return this._http.post<BlogResponseResult>(requestUrl, null)
      .pipe(map((value): boolean => {
        return value.status === 200;
      }));
  }

  hasVoted(pubId: number): Observable<boolean> {
    const requestUrl = this.articleCacheUrl + pubId + '/vote/';
    return this._http.get<BlogResponseResult>(requestUrl)
      .pipe(map((value): boolean => {
        return value.data;
      }));
  }
}
