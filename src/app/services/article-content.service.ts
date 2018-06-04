import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {findArticleByPubId} from '../mock-data/articles';
import {of} from 'rxjs/observable/of';
import {PublishedArticle} from '../data-model/published-article';

@Injectable()
export class ArticleContentService {
  getArticleContent(pubId: number): Observable<PublishedArticle> {
    return of(findArticleByPubId(pubId));
  }
  vote(pubId: number) {
  }
}
