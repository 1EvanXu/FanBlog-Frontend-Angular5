import { Injectable } from '@angular/core';
import {
  CategoriesManagementList, CategoryQueryFilter,
  DeletedArticlesManagementList,
  DraftsManagementList,
  ManagementOperationResult,
  PublishedArticlesManagementList, QueryFilter
} from '../data-model/management';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {
  getCategoriesManagementList,
  getDeletedArticlesManagementList,
  getDraftsManagementList,
  getPublishedArticlesManagementList
} from '../mock-data/management';
import {ArticleStatus} from '../data-model/article';

@Injectable()
export class ManagementService {

  getPublishedArticlesManagementList(pageIndex: number, filter?: QueryFilter): Observable<PublishedArticlesManagementList> {
    return of(getPublishedArticlesManagementList(pageIndex));
  }

  getDraftsManagementList(pageIndex: number, filter?: QueryFilter): Observable<DraftsManagementList> {
    return of(getDraftsManagementList(pageIndex));
  }

  getDeletedArticlesManagementList(pageIndex: number, filter?: QueryFilter): Observable<DeletedArticlesManagementList> {
    return of(getDeletedArticlesManagementList(pageIndex));
  }

  updateArticlesStatus(articlesIds: number[], articleStatus: ArticleStatus): Observable<ManagementOperationResult> {
    return of(ManagementOperationResult.Success);
  }

  deleteArticlesPermanently(articlesIds: number[]): Observable<ManagementOperationResult> {
    return of(ManagementOperationResult.Success);
  }

  getCategoriesManagementList(pageIndex: number, filter?: CategoryQueryFilter): Observable<CategoriesManagementList> {
    return of(getCategoriesManagementList(pageIndex));
  }

  deleteArticleCategories(categoryIds: number[]) {
    return of(ManagementOperationResult.Failed);
  }

}
