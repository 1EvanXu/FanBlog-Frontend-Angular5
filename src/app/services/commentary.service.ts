import {Injectable} from '@angular/core';
import {of} from 'rxjs/observable/of';
import {COMMENTARIES_1, COMMENTARIES_2} from '../mock-data/commentaries';
import {Observable} from 'rxjs/Observable';
import {Commentary} from '../entities/commentary';


@Injectable()
export class CommentaryService {
  loadCommentaries(pageIndex: number): Observable<Commentary[]> {
    return pageIndex === 1 ? of(COMMENTARIES_1) : of(COMMENTARIES_2);
  }
  postCommentary() {}
}
