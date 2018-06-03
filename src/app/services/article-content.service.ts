import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Article} from '../data-model/article';
import {findArticleByPubId} from '../mock-data/articles';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ArticleContentService {
  getArticleContent(pubId: number): Observable<Article> {
    return of(findArticleByPubId(pubId));
  }
  vote(pubId: number) {
  }
}
