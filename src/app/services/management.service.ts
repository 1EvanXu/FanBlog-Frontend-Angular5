import { Injectable } from '@angular/core';
import {
  AllArticlesManagementList, CategoriesListFilter, CategoriesManagementList, CategoriesManagementListItem,
  DeletedArticlesManagementList,
  DraftsManagementList,
  ListFilter, ManagementOperationResult,
  PublishedArticlesManagementList
} from '../data-model/management';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {
  getAllArticlesManagementList, getCategoriesManagementList,
  getDeletedArticlesManagementList,
  getDraftsManagementList,
  getPublishedArticlesManagementList
} from '../mock-data/management';
import {ArticleStatus} from '../data-model/article';

@Injectable()
export class ManagementService {

  getAllArticlesManagementList(pageIndex: number, filter?: ListFilter): Observable<AllArticlesManagementList> {
    return of(getAllArticlesManagementList(pageIndex));
  }

  getPublishedArticlesManagementList(pageIndex: number, filter?: ListFilter): Observable<PublishedArticlesManagementList> {
    return of(getPublishedArticlesManagementList(pageIndex));
  }

  getDraftsManagementList(pageIndex: number, filter?: ListFilter): Observable<DraftsManagementList> {
    return of(getDraftsManagementList(pageIndex));
  }

  getDeletedArticlesManagementList(pageIndex: number, filter?: ListFilter): Observable<DeletedArticlesManagementList> {
    return of(getDeletedArticlesManagementList(pageIndex));
  }

  updateArticlesStatus(articlesId: number[], articleStatus: ArticleStatus): Observable<ManagementOperationResult> {
    return of(ManagementOperationResult.Success);
  }

  deleteArticlesPermanently(articlesId: number[]): Observable<ManagementOperationResult> {
    return of(ManagementOperationResult.Success);
  }

  getCategoriesManagementList(pageIndex: number, filter?: CategoriesListFilter): Observable<CategoriesManagementList> {
    return of(getCategoriesManagementList(pageIndex));
  }

  deleteArticleCategories(categoryIds: number[]) {
    return of(ManagementOperationResult.Failed);
  }

  createCategory(categoryName: string): Observable<ManagementOperationResult> {
    return of(ManagementOperationResult.Failed);
  }

}
