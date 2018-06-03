import {Injectable} from '@angular/core';
import {of} from 'rxjs/observable/of';
import {COMMENTARIES_1, COMMENTARIES_2} from '../mock-data/commentaries';
import {Observable} from 'rxjs/Observable';
import {Commentary, Comment} from '../data-model/commentary';


@Injectable()
export class CommentaryService {
  loadCommentaries(pageIndex: number): Observable<{commentaries: Commentary[]; totalNumber: number}> {
    return pageIndex === 1 ? of({commentaries: COMMENTARIES_1, totalNumber: 10}) : of({commentaries: COMMENTARIES_2, totalNumber: 10});
  }
  postCommentary(comment: Comment) {}
}
