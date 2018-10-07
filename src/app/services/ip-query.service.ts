import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IPLocation} from '../data-model/ip-location';
import {IpQueryApiClient} from '../apis/ip-query.api.service';

@Injectable()
export class IpQueryService {

  constructor(private _apiClient: IpQueryApiClient) { }
  getQueryResult(ipAddress: string): Observable<IPLocation> {
    return this._apiClient.queryIPLocation(ipAddress);
  }

}
