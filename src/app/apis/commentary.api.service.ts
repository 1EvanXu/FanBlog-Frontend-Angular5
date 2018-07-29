import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_API_URL} from './common-api.config';
import {Observable} from 'rxjs/Observable';
import {CommentaryCollection} from '../data-model/commentary';
import {BlogResponseResult} from '../data-model/blog-response-result';
import {map} from 'rxjs/operators';

@Injectable()
export class CommentaryApiClient {

  private commentaryUrl = BASE_API_URL + 'article/';

  constructor(private _http: HttpClient) { }

  getCommentaries(pubId: number, pageIndex: number): Observable<CommentaryCollection> {
    const url = this.commentaryUrl + `${pubId}/commentary/p/${pageIndex}`;
    return this._http.get<BlogResponseResult>(url).pipe(map(value => value.data));
  }
}
