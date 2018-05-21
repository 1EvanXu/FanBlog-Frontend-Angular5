import {Injectable} from '@angular/core/core';
import {of} from '_rxjs@5.5.10@rxjs/observable/of';
import {COMMENTARIES_1} from '../mock-data/commentaries';

@Injectable()
export class CommentaryService {
  loadCommentaries() {
    return of(COMMENTARIES_1);
  }
}
