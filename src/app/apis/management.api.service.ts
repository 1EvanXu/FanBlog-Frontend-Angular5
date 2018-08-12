import {Injectable} from '@angular/core';
import {BASE_API_URL} from './common-api.config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ManagementApiClient {

  private managementApiUrl: string = BASE_API_URL + 'management/';

  constructor(private _http: HttpClient) { }

  getAllArticlesManagementList() { }

  getPublishedArticlesManagementList() { }

  getDraftsManagementList() { }

  getDeletedArticlesManagementList() { }

  updateArticlesStatus() { }

  deleteArticlesPermanently() { }

  getCategoriesManagementList() { }

  deleteArticleCategories() { }

  createCategory() { }
}
