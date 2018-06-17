import {Injectable} from '@angular/core';
import {BASE_API_URL} from './common-api.config';
import {HttpClient} from '@angular/common/http';
import {SideInformationCollection} from '../data-model/side-information';
import {retry} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SideInformationApiClient {
  private _baseUrl = BASE_API_URL + 'side-info/';

  constructor(private _http: HttpClient) {}

  getLatestArticles(): Observable<SideInformationCollection> {
    return this.getSideInformation('latest-articles');
  }

  getPopularArticles(): Observable<SideInformationCollection> {
    return this.getSideInformation('popular-articles');
  }

  getCategories(): Observable<SideInformationCollection> {
    return this.getSideInformation('categories');
  }

  private getSideInformation(infoType: string): Observable<SideInformationCollection> {
    if (infoType === '') {
      throw new Error('SideInfoType can not be empty');
    }
    const requestUrl = this._baseUrl + infoType;
    return this._http.get<SideInformationCollection>(requestUrl).pipe(retry(1));
  }
}
