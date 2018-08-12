import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BASE_API_URL} from './common-api.config';
import {BlogResponseResult} from '../data-model/blog-response-result';
import {Article} from '../data-model/article';
import {map} from 'rxjs/operators';

@Injectable()
export class MarkdownEditorApiClient {

  private editorApiUrl = BASE_API_URL + 'editor/';

  constructor(private _http: HttpClient) {}

  writeArticle(): Observable<number> {
    const requestUrl = this.editorApiUrl + 'article/new';
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  getArticleContent(articleId: number): Observable<Article> {
    const requestUrl = this.editorApiUrl + `article/${articleId}`;
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  saveArticleMarkdownContent(article: Article): Observable<boolean> {
    const requestUrl = this.editorApiUrl + `cache/`;
    return this._http.put<BlogResponseResult>(requestUrl, article).map(value => value.status === 200);
  }

  saveArticle(article: Article) {
    const requestUrl = this.editorApiUrl + 'article/';
    return this._http.put<BlogResponseResult>(requestUrl, article);
  }

  publishArticle() {}
}
