import { Injectable } from '@angular/core';
import {SideInformationApiClient} from '../apis/side-information.api.service';
import {SideInformationCollection} from '../data-model/side-information';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class SidebarService {

  constructor(private _apiClient: SideInformationApiClient) {}

  getLatestArticles(): Observable<SideInformationCollection> {
    return this._apiClient.getLatestArticles();
  }
  getPopularArticles(): Observable<SideInformationCollection> {
    return this._apiClient.getPopularArticles();
  }
  getCategories(): Observable<SideInformationCollection> {
    return this._apiClient.getCategories();
  }

}
