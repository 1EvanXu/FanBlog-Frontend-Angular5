import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Article, ArticleCategory, Draft} from '../data-model/article';
import {MarkdownEditorApiClient} from '../apis/markdown-editor.api.service';
import {PublishingArticle} from '../data-model/published-article';

@Injectable()
export class MarkdownEditorService {

  constructor(private _apiClient: MarkdownEditorApiClient) {}

  writeArticle(): Observable<number> {
    return this._apiClient.writeArticle();
  }

  getArticle(articleId: number): Observable<Draft> {
    return this._apiClient.getArticleContent(articleId);
  }

  saveArticleMarkdownContent(draft: Draft): Observable<SaveStatus> {
    return this._apiClient.saveDraftInCache(draft).map(
      value => {
        if (value) {
          return SaveStatus.SAVED;
        }
        return SaveStatus.UNSAVED;
      }
    );
  }

  saveArticle(article: Article): Observable<number> {
    return this._apiClient.saveArticle(article);
  }

  publishArticle(article: PublishingArticle): Observable<boolean> {
    return this._apiClient.publishArticle(article);
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
