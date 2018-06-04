import { Injectable } from '@angular/core';
import {
  AllArticlesManagementList,
  DeletedArticlesManagementList,
  DraftsManagementList,
  ListFilter, ManagementOperationResult,
  PublishedArticlesManagementList
} from '../data-model/management';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {
  getAllArticlesManagementList,
  getDeletedArticlesManagementList,
  getDraftsManagementList,
  getPublishedArticlesManagementList} from '../mock-data/articles-management';

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

  deleteArticles(articlesId: number[]): Observable<ManagementOperationResult> {
    return of(ManagementOperationResult.Success);
  }

  deleteArticlesPermanently(articlesId: number[]): Observable<ManagementOperationResult> {
    return of(ManagementOperationResult.Success);
  }

  revokeDeletedArticles(articlesId: number[]): Observable<ManagementOperationResult> {
    return of(ManagementOperationResult.Success);
  }

  revokePublishedArticles(articlesId: number[]): Observable<ManagementOperationResult> {
    return of(ManagementOperationResult.Success);
  }

  getArticleCategories(pageIndex: number) {}

  deleteArticleCategories(categoryIds: number[]) {}


}
