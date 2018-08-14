import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BASE_API_URL} from './common-api.config';
import {BlogResponseResult} from '../data-model/blog-response-result';
import {Article, ArticleCategory, Draft} from '../data-model/article';
import {map} from 'rxjs/operators';
import {PublishingArticle} from '../data-model/published-article';

@Injectable()
export class MarkdownEditorApiClient {

  private editorApiUrl = BASE_API_URL + 'editor/';

  constructor(private _http: HttpClient) {}

  writeArticle(): Observable<number> {
    const requestUrl = this.editorApiUrl + 'article/new';
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  getArticleContent(articleId: number): Observable<Draft> {
    const requestUrl = this.editorApiUrl + `article/${articleId}`;
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }

  saveDraftInCache(draft: Draft): Observable<boolean> {
    const requestUrl = this.editorApiUrl + `cache/`;
    return this._http.put<BlogResponseResult>(requestUrl, draft).map(value =>  value.status === 200);
  }

  saveArticle(article: Article): Observable<number> {
    const requestUrl = this.editorApiUrl + 'article/';
    return this._http.post<BlogResponseResult>(requestUrl, article).pipe(map(value => value.data));
  }

  publishArticle(publishingArticle: PublishingArticle): Observable<boolean> {
    const requestUrl = this.editorApiUrl + 'publish/';
    return this._http.post<BlogResponseResult>(requestUrl, publishingArticle).map(value => value.status === 200);
  }

  searchCategories(keyword: string): Observable<Array<ArticleCategory>> {
    const requestUrl = this.editorApiUrl + `category?keyword=${keyword}`;
    return this._http.get<BlogResponseResult>(requestUrl).pipe(map(value => value.data));
  }
}

