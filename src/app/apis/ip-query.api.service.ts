import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_API_URL} from './common-api.config';
import {Observable} from 'rxjs/Observable';
import {BlogResponseResult} from '../data-model/blog-response-result';
import {IPLocation} from '../data-model/ip-location';

@Injectable()
export class IpQueryApiClient {
  IPQueryApiUrl = BASE_API_URL + 'ip/location';
  constructor(private _http: HttpClient) {}
  queryIPLocation(ipAddress: string): Observable<IPLocation> {
    const requestUrl = this.IPQueryApiUrl + `?ip=${ipAddress}`;
    return this._http.get<BlogResponseResult>(requestUrl).map(value => value.data);
  }
}
