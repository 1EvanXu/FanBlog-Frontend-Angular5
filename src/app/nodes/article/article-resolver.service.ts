import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Article} from '../../data-model/article';
import {Observable} from 'rxjs/Observable';
import {PublishedArticleContentService} from '../../services/published-article-content.service';
import {map, take} from 'rxjs/operators';

@Injectable()
export class ArticleResolverService implements Resolve<Article> {

  constructor(private service: PublishedArticleContentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> | Promise<Article> | Article {
    const pubId = +route.paramMap.get('pubId');

    return this.service.getArticleContent(pubId).pipe(
      take(1),
      map(article => {
        if (article) {
          return article;
        } else {
          this.router.navigate(['/site/articles']);
          return null;
        }
      })
    );

  }

}
