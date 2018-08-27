import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_API_URL, HttpRequestOption} from './common-api.config';
import {Observable} from 'rxjs/Observable';
import {BlogResponseResult} from '../data-model/blog-response-result';
import {map} from 'rxjs/operators';
import {User} from '../data-model/user';

@Injectable()
export class AuthApiClient {
  private authApiUrl = BASE_API_URL + 'user/';

  constructor(private _http: HttpClient) { }

  getUser(userId: number): Observable<User> {
    const requestUrl = this.authApiUrl + userId;
    return this._http.get<BlogResponseResult>(requestUrl, HttpRequestOption).pipe(map(result => result.data));
  }

  updateUserState(userId: number): Observable<boolean> {
    const requestUrl = this.authApiUrl + `${userId}/state/`;
    return this._http.put<BlogResponseResult>(requestUrl, null, HttpRequestOption).pipe(map(value => value.data === 0));
  }

  isLoggedIn(userId: number): Observable<boolean> {
    const requestUrl = this.authApiUrl + `${userId}/state/`;
    return this._http.get<BlogResponseResult>(requestUrl, HttpRequestOption).pipe(map(result => result.data === 1));
  }
}
