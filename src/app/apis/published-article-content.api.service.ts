import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Article} from '../data-model/article';
import {BASE_API_URL} from './common-api.config';
import {map, retry} from 'rxjs/operators';
import {BlogResponseResult} from '../data-model/blog-response-result';

@Injectable()
export class PublishedArticleContentApiClient {
  private _baseUrl = BASE_API_URL + 'cache/articles/';

  constructor(private _http: HttpClient) { }

  getPublishedArticle(pubId: number): Observable<Article> {
    return this._http.get<BlogResponseResult>(this._baseUrl + pubId)
      .pipe(map(value => value.data));
  }

  voteForPublishedArticle(pubId: number): Observable<boolean> {
    const requestUrl = this._baseUrl + pubId + '/vote/';
    return this._http.put<BlogResponseResult>(requestUrl, null)
      .pipe(map((value): boolean => {
        return value.status === 200;
      }));
  }
}
