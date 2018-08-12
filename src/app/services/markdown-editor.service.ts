import { Injectable } from '@angular/core';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {Article} from '../data-model/article';
import {MarkdownEditorApiClient} from '../apis/markdown-editor.api.service';

@Injectable()
export class MarkdownEditorService {

  constructor(private _apiClient: MarkdownEditorApiClient) {}

  writeArticle(): Observable<number> {
    return this._apiClient.writeArticle();
  }

  getArticle(articleId: number): Observable<Article> {
    return this._apiClient.getArticleContent(articleId);
  }

  saveArticleMarkdownContent(articleId: number, content: string): Observable<SaveStatus> { return of(SaveStatus.SAVED); }

  saveArticle(articleId: number, content: string) {}

  publishArticle() {}
}

export enum SaveStatus {
  SAVED = 'SAVED',
  SAVING = 'SAVING',
  UNSAVED = 'UNSAVED',
  UNKNOWN = 'UNKNOWN'
}
