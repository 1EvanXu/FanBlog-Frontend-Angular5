import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_API_URL} from './common-api.config';

@Injectable()
export class CommentaryApiClient {

  private commentaryUrl = BASE_API_URL + 'art';
  constructor(private _http: HttpClient) { }

  getCommnetaries() {}
}
