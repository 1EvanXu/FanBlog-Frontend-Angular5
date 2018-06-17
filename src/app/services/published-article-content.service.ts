import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {findArticleByPubId} from '../mock-data/articles';
import {of} from 'rxjs/observable/of';
import {PublishedArticle} from '../data-model/published-article';
import {PublishedArticleContentApiClient} from '../apis/published-article-content.api.service';

@Injectable()
export class PublishedArticleContentService {

  constructor(private _apiClient: PublishedArticleContentApiClient) { }

  getArticleContent(pubId: number): Observable<PublishedArticle> {
    return of(findArticleByPubId(pubId));
  }
  vote(pubId: number): Observable<boolean> {
    return of(true);
  }
}
