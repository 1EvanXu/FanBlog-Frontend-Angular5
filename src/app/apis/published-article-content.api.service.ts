import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PublishedArticle} from '../data-model/published-article';
import {BASE_API_URL} from './common-api.config';
import {retry} from 'rxjs/operators';

@Injectable()
export class PublishedArticleContentApiClient {
  private _baseUrl = BASE_API_URL + 'article/';

  constructor(private _http: HttpClient) { }

  getPublishedArticle(pubId: number): Observable<PublishedArticle> {
    return this._http.get<PublishedArticle>(this._baseUrl + pubId)
      .pipe(retry(2));
  }

  voteForPublishedArticle(pubId: number): Observable<boolean> {
    const requestUrl = this._baseUrl + pubId + '/vote/';
    return this._http.put<boolean>(requestUrl, null);
  }


}