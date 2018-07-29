import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {PublishedArticle} from '../data-model/published-article';
import {PublishedArticleContentApiClient} from '../apis/published-article-content.api.service';

@Injectable()
export class PublishedArticleContentService {

  constructor(private _apiClient: PublishedArticleContentApiClient) { }

  getArticleContent(pubId: number): Observable<PublishedArticle> {
    return this._apiClient.getPublishedArticle(pubId);
  }
  vote(pubId: number): Observable<boolean> {
    return of(true);
  }
}
