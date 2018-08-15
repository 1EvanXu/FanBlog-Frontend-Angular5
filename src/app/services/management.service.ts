import { Injectable } from '@angular/core';
import {
  ArticleQueryFilter,
  CategoriesManagementList, CategoryQueryFilter,
  DeletedArticlesManagementList,
  DraftsManagementList,
  ManagementOperationResult, PublishedArticleQueryFilter,
  PublishedArticlesManagementList, QueryFilter
} from '../data-model/management';
import {Observable} from 'rxjs/Observable';
import {ArticleStatus} from '../data-model/article';
import {ManagementApiClient} from '../apis/management.api.service';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ManagementService {

  constructor(private _apiClient: ManagementApiClient) {}

  getPublishedArticlesManagementList(pageIndex: number, filter?: QueryFilter): Observable<PublishedArticlesManagementList> {

    return this._apiClient.getPublishedArticlesManagementList(pageIndex, <PublishedArticleQueryFilter>filter);
  }

  getDraftsManagementList(pageIndex: number, filter?: QueryFilter): Observable<DraftsManagementList> {
    return this._apiClient.getDraftsManagementList(pageIndex, <ArticleQueryFilter>filter);
  }

  getDeletedArticlesManagementList(pageIndex: number, filter?: QueryFilter): Observable<DeletedArticlesManagementList> {
    return this._apiClient.getDeletedArticlesManagementList(pageIndex, <ArticleQueryFilter>filter);
  }

  updateArticlesStatus(articlesIds: number[], articleStatus: ArticleStatus): Observable<ManagementOperationResult> {
    return this._apiClient.updateArticlesStatus(articlesIds, articleStatus);
  }

  deleteArticlesPermanently(articlesIds: number[]): Observable<ManagementOperationResult> {
    return this._apiClient.deleteArticlesPermanently(articlesIds);
  }

  getCategoriesManagementList(pageIndex: number, filter?: CategoryQueryFilter): Observable<CategoriesManagementList> {
    return this._apiClient.getCategoriesManagementList(pageIndex, filter);
  }

  deletePublishedArticles(pubIds: number[]): Observable<ManagementOperationResult> {
    return this._apiClient.deletePublishedArticles(pubIds);
  }

  deleteArticleCategories(categoryIds: number[]): Observable<ManagementOperationResult> {
    return of(ManagementOperationResult.Failed);
  }

}
