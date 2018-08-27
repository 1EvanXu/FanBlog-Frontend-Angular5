import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Draft} from '../../data-model/draft';
import {Observable} from 'rxjs/Observable';
import {MarkdownEditorService} from '../../services/markdown-editor.service';
import {map, take} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class DraftResolverService implements Resolve<Draft> {

  constructor(private editorService: MarkdownEditorService, private router: Router, private msgService: NzMessageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Draft> | Promise<Draft> | Draft {
    const draftId = +route.paramMap.get('articleId');
    console.log(draftId);
    return this.editorService.getArticle(draftId).pipe(
      take(1),
      map(draft => {
        if (draft) {
          return draft;
        } else {
          this.msgService.error('The daft not exist!');
          this.router.navigate(['/management']);
          return null;
        }
      })
    );
  }
}
