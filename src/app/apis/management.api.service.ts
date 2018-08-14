import {Injectable} from '@angular/core';
import {BASE_API_URL} from './common-api.config';
import {HttpClient} from '@angular/common/http';
import {
  ArticleQueryFilter, CategoriesManagementList, CategoryQueryFilter,
  DeletedArticlesManagementList,
  DraftsManagementList,
  ManagementOperationResult,
  PublishedArticleQueryFilter,
  PublishedArticlesManagementList,
} from '../data-model/management';
import {Observable} from 'rxjs/Observable';
import {BlogResponseResult} from '../data-model/blog-response-result';
import {map} from 'rxjs/operators';
import {ArticleStatus} from '../data-model/article';

@Injectable()
export class ManagementApiClient {

  private managementApiUrl: string = BASE_API_URL + 'management/';

  constructor(private _http: HttpClient) { }

  getPublishedArticlesManagementList(pageIndex: number, filter?: PublishedArticleQueryFilter): Observable<PublishedArticlesManagementList> {
    let requestUrl = this.managementApiUrl + `publishedArticles/p/${pageIndex}`;
    if (filter) {
      requestUrl += `?filter=${filter}`;
    }
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  getDraftsManagementList(pageIndex: number, filter?: ArticleQueryFilter): Observable<DraftsManagementList> {
    let requestUrl = this.managementApiUrl + `drafts/p/${pageIndex}`;
    if (filter) {
      requestUrl += `?filter=${filter}`;
    }
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  getDeletedArticlesManagementList(pageIndex: number, filter?: ArticleQueryFilter): Observable<DeletedArticlesManagementList> {
    let requestUrl = this.managementApiUrl + `drafts/p/${pageIndex}`;
    if (filter) {
      requestUrl += `?filter=${filter}`;
    }
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  updateArticlesStatus(articlesIds: number[], articleStatus: ArticleStatus): Observable<ManagementOperationResult> {
    const requestUrl = this.managementApiUrl + 'articles/status';
    return this._http.put<BlogResponseResult>(requestUrl, {ids: articlesIds, status: articleStatus}).pipe(map(value => {
        if (value.status === 200) {
          return ManagementOperationResult.Success;
        }
        return ManagementOperationResult.Failed;
      }
    ));
  }

  revokePublishedArticles(pubIds: number[]): Observable<ManagementOperationResult> {
    const requestUrl = this.managementApiUrl + 'publishedArticles';
    return this._http.put<BlogResponseResult>(requestUrl, pubIds).pipe(map(
      value => {
        if (value.status === 200) {
          return ManagementOperationResult.Success;
        }
        return ManagementOperationResult.Failed;
      }
    ));
  }

  deleteArticlesPermanently(articlesIds: number[]): Observable<ManagementOperationResult> {
    const requestUrl = this.managementApiUrl + 'articles';
    return this._http.put<BlogResponseResult>(requestUrl, articlesIds).pipe(map(
      value => {
        if (value.status === 200) {
          return ManagementOperationResult.Success;
        }
        return ManagementOperationResult.Failed;
      }
    ));
  }

  getCategoriesManagementList(pageIndex: number, filter?: CategoryQueryFilter): Observable<CategoriesManagementList> {
    const requestUrl = this.managementApiUrl + 'categories';
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

}
