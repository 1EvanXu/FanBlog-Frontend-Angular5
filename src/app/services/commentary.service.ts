import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Comment, CommentaryCollection} from '../data-model/commentary';
import {CommentaryApiClient} from '../apis/commentary.api.service';


@Injectable()
export class CommentaryService {

  constructor(private _apiClient: CommentaryApiClient) {}

  loadCommentaries(pubId: number, pageIndex: number): Observable<CommentaryCollection> {
    return this._apiClient.getCommentaries(pubId, pageIndex);
  }
  postCommentary(pubId: number, comment: Comment): Observable<'success'|'failed'> {
    return this._apiClient.postComment(pubId, comment);
  }
}
