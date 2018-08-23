import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Draft, ArticleCategory, TempDraft} from '../data-model/draft';
import {MarkdownEditorApiClient} from '../apis/markdown-editor.api.service';
import {TempArticle} from '../data-model/article';

@Injectable()
export class MarkdownEditorService {

  constructor(private _apiClient: MarkdownEditorApiClient) {}

  writeArticle(): Observable<number> {
    return this._apiClient.writeArticle();
  }

  getArticle(articleId: number): Observable<TempDraft> {
    return this._apiClient.getArticleContent(articleId);
  }

  saveArticleMarkdownContent(tempDraft: TempDraft): Observable<SaveStatus> {
    return this._apiClient.saveDraftInCache(tempDraft).map(
      value => {
        if (value) {
          return SaveStatus.SAVED;
        }
        return SaveStatus.UNSAVED;
      }
    );
  }

  saveArticle(article: Draft): Observable<number> {
    return this._apiClient.saveArticle(article);
  }

  publishArticle(tempArticle: TempArticle): Observable<boolean> {
    return this._apiClient.publishArticle(tempArticle);
  }

  searchCategories(keyword: string): Observable<Array<ArticleCategory>> {
    return this._apiClient.searchCategories(keyword);
  }
}

export enum SaveStatus {
  SAVED = 'SAVED',
  SAVING = 'SAVING',
  UNSAVED = 'UNSAVED',
  UNKNOWN = 'UNKNOWN'
}
