import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BASE_API_URL} from './common-api.config';
import {BlogResponseResult} from '../data-model/blog-response-result';
import {Draft, ArticleCategory, TempDraft} from '../data-model/draft';
import {map} from 'rxjs/operators';
import {TempArticle} from '../data-model/article';

@Injectable()
export class MarkdownEditorApiClient {

  private editorApiUrl = BASE_API_URL + 'editor/';

  constructor(private _http: HttpClient) {}

  writeArticle(): Observable<number> {
    const requestUrl = this.editorApiUrl + 'article/new';
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  getArticleContent(articleId: number): Observable<TempDraft> {
    const requestUrl = this.editorApiUrl + `article/${articleId}`;
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  saveDraftInCache(tempDraft: TempDraft): Observable<boolean> {
    const requestUrl = this.editorApiUrl + `cache/`;
    return this._http.put<BlogResponseResult>(requestUrl, tempDraft).map(value =>  value.status === 200);
  }

  saveArticle(article: Draft): Observable<number> {
    const requestUrl = this.editorApiUrl + 'article/';
    return this._http.post<BlogResponseResult>(requestUrl, article).pipe(map(value => value.data));
  }

  publishArticle(tempArticle: TempArticle): Observable<boolean> {
    const requestUrl = this.editorApiUrl + 'publish/';
    return this._http.post<BlogResponseResult>(requestUrl, tempArticle).map(value => value.status === 200);
  }

  searchCategories(keyword: string): Observable<Array<ArticleCategory>> {
    const requestUrl = this.editorApiUrl + `category?keyword=${keyword}`;
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }
}

