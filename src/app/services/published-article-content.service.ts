import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Article} from '../data-model/article';
import {PublishedArticleContentApiClient} from '../apis/published-article-content.api.service';

@Injectable()
export class PublishedArticleContentService {

  constructor(private _apiClient: PublishedArticleContentApiClient) { }

  getArticleContent(pubId: number): Observable<Article> {
    return this._apiClient.getPublishedArticle(pubId);
  }

  vote(pubId: number): Observable<boolean> {
    return this._apiClient.voteForPublishedArticle(pubId);
  }

  hasVoted(pubId: number): Observable<boolean> {
    return this._apiClient.hasVoted(pubId);
  }
}
