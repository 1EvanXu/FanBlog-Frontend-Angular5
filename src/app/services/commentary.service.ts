import {Injectable} from '@angular/core';
import {of} from 'rxjs/observable/of';
import {COMMENTARIES_1} from '../mock-data/commentaries';
import {Observable} from 'rxjs/Observable';
import {Commentary} from '../entities/commentary';


@Injectable()
export class CommentaryService {
  loadCommentaries(): Observable<Commentary[]> {
    return of(COMMENTARIES_1);
  }
}
