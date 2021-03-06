import {Injectable} from '@angular/core';
import {BASE_API_URL, HttpRequestOption} from './common-api.config';
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
import {ArticleStatus} from '../data-model/draft';

@Injectable()
export class ManagementApiClient {

  private managementApiUrl: string = BASE_API_URL;

  constructor(private _http: HttpClient) { }

  getArticlesManagementList(pageIndex: number, filter?: PublishedArticleQueryFilter): Observable<PublishedArticlesManagementList> {
    const requestUrl = this.managementApiUrl + `articles/managementItems/p/${pageIndex}?orderField=${filter.orderField}&order=${filter.order}&type=${filter.type}`;

    // console.log(requestUrl);
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  getDraftsManagementList(pageIndex: number, filter?: ArticleQueryFilter): Observable<DraftsManagementList> {
    const requestUrl = this.managementApiUrl + `drafts/managementItems/p/${pageIndex}?orderField=${filter.orderField}&order=${filter.order}&status=${filter.status}`;
    // console.log(requestUrl);
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  getDeletedManagementList(pageIndex: number, filter?: ArticleQueryFilter): Observable<DeletedArticlesManagementList> {
    const requestUrl = this.managementApiUrl + `drafts/managementItems/p/${pageIndex}?orderField=${filter.orderField}&order=${filter.order}&status=${filter.status}`;
    // console.log(requestUrl);
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  updateDraftsStatus(articlesIds: number[], articleStatus: ArticleStatus): Observable<ManagementOperationResult> {
    const requestUrl = this.managementApiUrl + 'drafts/status';
    return this._http.put<BlogResponseResult>(requestUrl, {articleIds: articlesIds, status: articleStatus}, HttpRequestOption).pipe(map(value => {
        if (value.status === 200) {
          return ManagementOperationResult.Success;
        }
        return ManagementOperationResult.Failed;
      }
    ));
  }

  deleteArticles(pubIds: number[]): Observable<ManagementOperationResult> {
    const requestUrl = this.managementApiUrl + `articles?ids=${pubIds}`;
    return this._http.delete<BlogResponseResult>(requestUrl, HttpRequestOption).pipe(map(
      value => {
        if (value.status === 200) {
          return ManagementOperationResult.Success;
        }
        return ManagementOperationResult.Failed;
      }
    ));
  }

  deleteDraftsPermanently(articlesIds: number[]): Observable<ManagementOperationResult> {
    const requestUrl = this.managementApiUrl + `drafts?ids=${articlesIds}`;
    // console.log(requestUrl);
    return this._http.delete<BlogResponseResult>(requestUrl, HttpRequestOption).pipe(map(
      value => {
        if (value.status === 200) {
          return ManagementOperationResult.Success;
        }
        return ManagementOperationResult.Failed;
      }
    ));
  }

  getCategoriesManagementList(pageIndex: number, filter?: CategoryQueryFilter): Observable<CategoriesManagementList> {
    const requestUrl = this.managementApiUrl + `categories/p/${pageIndex}?orderField=${filter.orderField}&order=${filter.order}`;
    // console.log(requestUrl);
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

}
