import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Draft} from '../../data-model/draft';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DraftResolverService implements Resolve<Draft> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Draft> | Promise<Draft> | Draft {
    const draftId = +route.paramMap.get('articleId');
    return undefined;
  }
}
