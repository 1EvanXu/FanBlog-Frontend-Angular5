import {Component, ComponentFactoryResolver, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ArticleItem} from '../../entities/article-item';
import {ArticlesService} from '../../services/articles.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ArticlesDirective} from './articles.directive';
import {ArticlesListComponent} from '../../components/articles-list/articles-list.component';
import {BreadcrumbService} from '../../services/channel.service';


@Component({
  template: `
    <div nz-col [nzSm]="20" [nzMd]="18" style="margin-top: 5px">
      <nz-spin [nzSpinning]="loading" [nzTip]="'Loading article list ...'">
        <ng-container *ngTemplateOutlet="load"></ng-container>
        <ng-template appArticleList></ng-template>
      </nz-spin>
      <div nz-row class="pagination-container" [ngStyle]="{'display': totalNumberOfArticles > ARTICLES_NUMBER_PER_PAGE ? '' : 'none'}">
        <div nz-col [nzOffset]="4" [nzSpan]="16">
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
  pageIndex = 1;
  firstInit = false;
  categoryName: string;
  private _categoryId: number;
  private _pattern: 'all' | 'category' | 'search';
  @ViewChild(ArticlesDirective) articlesDirective: ArticlesDirective;
  constructor(
    private articlesService: ArticlesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService
    ) { }

  ngOnInit() {

    this.loading = true;
    this.firstInit = true;

    const currentUrl = this.router.url;
    if (currentUrl.match('articles/all$')) {
      this._pattern = 'all';

      this.breadcrumbService.setBreadcrumb(['Articles', 'all']);

      this.getAllArticles(this.pageIndex);
    } else if (currentUrl.match('articles/category/\\d+$')) {
      this._pattern = 'category';

      this.breadcrumbService.setBreadcrumb(['Articles', 'category']);

      this.params$ = this.route.firstChild.paramMap;
      this.params$.subscribe(params => {
        this._categoryId = +params.get('_categoryId');
        this.getArticlesByCategory(this._categoryId, this.pageIndex);
      });
    } //  else if (currentUrl.match('articles/search$')) {
    //   this._pattern = 'search';
    //   this.breadcrumbService.setBreadcrumb(['Articles', 'search'])
    //   this.getArticlesBySearch('', this.pageIndex);
    // }
    this.route.url.subscribe(data => console.log(data, this._categoryId));

  }

  getAllArticles(pageIndex: number) {
    this.articlesService.getAllArticles(pageIndex).subscribe(
      data => {
        this.articleItemsList = data.articleItems;
        this.totalNumberOfArticles = data.totalNumber;
        this.loadArticlesListComponent(data.articleItems);
        },
    () => {},
      () => { this.loading = false; this.firstInit =  false; }
    );
  }

  getArticlesByCategory(id: number, pageIndex: number) {
    this.articlesService.getArticlesByCategory(id, pageIndex).subscribe(
      data => {
        this.articleItemsList = data.articleItems;
        this.totalNumberOfArticles = data.totalNumber;
        // this.categoryName = data.categoryName;
        this.loadArticlesListComponent(data.articleItems);
      },
      () => {
      },
      () => {
        this.loading = false;
        this.firstInit = false;
      }
    );
  }

  // getArticlesBySearch(keywords: string, pageIndex: number) {
  //   this.articlesService.getArticlesBySearch(keywords, pageIndex).subscribe(
  //     data => {
  //       this.articleItemsList = data.articleItems;
  //       this.totalNumberOfArticles = data.totalNumber;
  //       this.loadArticlesListComponent(data.articleItems);
  //     },
  //     () => {},
  //     () => { this.loading = false; this.firstInit =  false; }
  //   );
  // }
  private loadArticlesListComponent(list: ArticleItem[]) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ArticlesListComponent);
    const viewContainerRef = this.articlesDirective.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ArticlesListComponent>componentRef.instance).articlesList = list;
  }
  changePageIndex() {
    this.loading = true;
    switch (this._pattern) {
      case 'all': this.getAllArticles(this.pageIndex); break;
      case 'category': this.getArticlesByCategory(this._categoryId, this.pageIndex); break;
    }
  }
}
