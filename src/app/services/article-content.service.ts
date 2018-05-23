import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Article} from '../entities/article';
import {findArticleByPubId} from '../mock-data/articles';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ArticleContentService {
  loadArticleContent(pubId: number): Observable<Article> {
    return of(findArticleByPubId(pubId));
  }
}
