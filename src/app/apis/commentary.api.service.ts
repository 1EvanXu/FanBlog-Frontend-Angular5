import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_API_URL, HttpRequestOption} from './common-api.config';
import {Observable} from 'rxjs/Observable';
import {Comment, CommentaryCollection} from '../data-model/commentary';
import {BlogResponseResult} from '../data-model/blog-response-result';
import {map} from 'rxjs/operators';

@Injectable()
export class CommentaryApiClient {

  private commentaryUrl = BASE_API_URL + 'commentaries/';

  constructor(private _http: HttpClient) { }

  getCommentaries(pubId: number, pageIndex: number): Observable<CommentaryCollection> {
    const url = this.commentaryUrl + `${pubId}/p/${pageIndex}`;
    return this._http.get<BlogResponseResult>(url).pipe(map(value => value.data));
  }

  postComment(pubId: number, comment: Comment): Observable<'success'|'failed'> {
    const url = this.commentaryUrl + `${pubId}`;
    return this._http.post<BlogResponseResult>(url, comment).pipe(map(value => {
      if (value.status === 200) {
        return 'success';
      }
      return 'failed';
    }));
  }
}
