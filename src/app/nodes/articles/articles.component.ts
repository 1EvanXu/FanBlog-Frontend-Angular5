import {Component, ComponentFactoryResolver, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ArticleItem} from '../../entities/article-item';
import {ArticlesService} from '../../services/articles.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ArticlesDirective} from './articles.directive';
import {ArticlesListComponent} from '../../components/articles-list/articles-list.component';

@Component({
  template: `
    <div nz-col [nzSm]="20" [nzMd]="18" style="margin-top: 5px">
      <nz-spin [nzSpinning]="loading" [nzTip]="'Loading article list ...'">
        <ng-container *ngTemplateOutlet="load"></ng-container>
        <ng-template appArticleList></ng-template>
      </nz-spin>
      <div nz-row class="pagination-container">
        <div nz-col [nzOffset]="4" [nzSpan]="16" [hidden]="totalNumberOfArticles <= ARTICLES_NUMBER_PER_PAGE">
          <nz-pagination [(nzPageIndex)]="pageIndex" [nzTotal]="totalNumberOfArticles" [nzPageSize]="ARTICLES_NUMBER_PER_PAGE"
                         [nzSize]="'small'" (nzPageIndexChange)="changePageIndex()">
          </nz-pagination>
        </div>
      </div>
    </div>
    <ng-template #load>
      <div *ngIf="loading && firstInit" style="margin-bottom: 10px; margin-top: 10px">
        <nz-card style="margin-bottom: 10px" [nzLoading]="true" [nzBordered]="false"></nz-card>
        <nz-card style="margin-bottom: 10px" [nzLoading]="true" [nzBordered]="false"></nz-card>
        <nz-card style="margin-bottom: 10px" [nzLoading]="true" [nzBordered]="false"></nz-card>
        <nz-card style="margin-bottom: 10px" [nzLoading]="true" [nzBordered]="false"></nz-card>
      </div>
    </ng-template>
  `,
  styles: [
    `
      div .pagination-container {
        background-color: white;
        padding: 5px;
        text-align: center;
      }
    `
  ],
})
export class ArticlesComponent implements OnInit {
  articleItemsList: ArticleItem[];
  params$: Observable<ParamMap>;
  loading: boolean;
  totalNumberOfArticles: number;
  ARTICLES_NUMBER_PER_PAGE = 6; // default 10
  pageIndex = 4;
  firstInit = false;
  categoryId: number;
  @ViewChild(ArticlesDirective) articlesDirective: ArticlesDirective;
  constructor(
    private articlesService: ArticlesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    // this.totalNumberOfArticles = 50;
    this.params$ = this.route.firstChild.paramMap;
    this.params$.subscribe(params => {
      this.categoryId = parseInt(params.get('categoryId'), 0);
    });
    this.loading = true;
    this.firstInit = true;
    this.getArticleItemsList(this.pageIndex);
    this.route.url.subscribe(data => console.log(data, this.categoryId));
  }
  getArticleItemsList(pageIndex: number) {
    this.articlesService.getArticles(pageIndex).subscribe(
      data => {
        this.articleItemsList = data.articleItems;
        this.totalNumberOfArticles = data.totalNumber;
        this.loadArticlesListComponent(data.articleItems);
        },
    () => {},
      () => { this.loading = false; this.firstInit =  false; }
    );
  }
  private loadArticlesListComponent(list: ArticleItem[]) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ArticlesListComponent);
    const viewContainerRef = this.articlesDirective.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ArticlesListComponent>componentRef.instance).articlesList = list;
  }
  changePageIndex() {
    this.loading = true;
    this.getArticleItemsList(this.pageIndex);
  }
}
