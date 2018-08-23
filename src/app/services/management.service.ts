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
import {ArticleStatus} from '../data-model/draft';
import {ManagementApiClient} from '../apis/management.api.service';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ManagementService {

  constructor(private _apiClient: ManagementApiClient) {}

  getPublishedArticlesManagementList(pageIndex: number, filter?: QueryFilter): Observable<PublishedArticlesManagementList> {

    return this._apiClient.getArticlesManagementList(pageIndex, <PublishedArticleQueryFilter>filter);
  }

  getDraftsManagementList(pageIndex: number, filter?: QueryFilter): Observable<DraftsManagementList> {
    return this._apiClient.getDraftsManagementList(pageIndex, <ArticleQueryFilter>filter);
  }

  getDeletedDraftsManagementList(pageIndex: number, filter?: QueryFilter): Observable<DeletedArticlesManagementList> {
    return this._apiClient.getDeletedManagementList(pageIndex, <ArticleQueryFilter>filter);
  }

  updateDraftsStatus(articlesIds: number[], articleStatus: ArticleStatus): Observable<ManagementOperationResult> {
    return this._apiClient.updateDraftsStatus(articlesIds, articleStatus);
  }

  deleteDraftsPermanently(articlesIds: number[]): Observable<ManagementOperationResult> {
    return this._apiClient.deleteDraftsPermanently(articlesIds);
  }

  getCategoriesManagementList(pageIndex: number, filter?: CategoryQueryFilter): Observable<CategoriesManagementList> {
    return this._apiClient.getCategoriesManagementList(pageIndex, filter);
  }

  deletePublishedArticles(pubIds: number[]): Observable<ManagementOperationResult> {
    return this._apiClient.deleteArticles(pubIds);
  }

  deleteArticleCategories(categoryIds: number[]): Observable<ManagementOperationResult> {
    return of(ManagementOperationResult.Failed);
  }

}
