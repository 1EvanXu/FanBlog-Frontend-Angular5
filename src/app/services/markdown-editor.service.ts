import { Injectable } from '@angular/core';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MarkdownEditorService {
  getArticleMarkdownContent(articleId: number) {}
  saveArticleMarkdownContent(articleId: number): Observable<SaveStatus> { return of(SaveStatus.SAVED); }
  saveArticleHTMLContent(articleId: number) {}
  publishArticle() {}
}

export enum SaveStatus {
  SAVED = 'SAVED',
  SAVING = 'SAVING',
  UNSAVED = 'UNSAVED',
  UNKNOWN = 'UNKNOWN'
}
