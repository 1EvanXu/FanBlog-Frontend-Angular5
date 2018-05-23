import {Component, ComponentFactoryResolver, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ArticleItem} from '../../entities/article-item';
import {ArticlesService} from '../../services/articles.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ArticlesDirective} from './articles.directive';
import {ArticlesListComponent} from '../../components/articles-list/articles-list.component';

@Component({
  template: `
    <div nz-col [nzSm]="20" [nzMd]="18">
      <ng-template appArticleList></ng-template>
      <div nz-row style="background-color: white;padding: 5px;">
        <div nz-col [nzOffset]="4" [nzSpan]="16" style="text-align: center">
          <nz-pagination [(nzPageIndex)]="pageIndex" [nzTotal]="totalNumberOfArticles" [nzPageSize]="ARTICLES_NUMBER_PER_PAGE"
                         [nzSize]="'small'" (nzPageIndexChange)="changePageIndex()">
          </nz-pagination>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AllArticlesComponent implements OnInit {
  articleItemsList: ArticleItem[];
  params$: Observable<ParamMap>;

  totalNumberOfArticles: number;
  ARTICLES_NUMBER_PER_PAGE = 10;
  pageIndex = 1;

  categoryId: number;
  @ViewChild(ArticlesDirective) articlesDirective: ArticlesDirective;
  constructor(
    private articlesService: ArticlesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.totalNumberOfArticles = 50;
    this.params$ = this.route.paramMap;
    this.params$.subscribe(params => {
      this.pageIndex = parseInt(params.get('pageIndex'), 0);
      this.categoryId = parseInt(params.get('categoryId'), 0);
    });
    this.getArticleItemsList(this.pageIndex);
    this.route.url.subscribe(data => console.log(data, this.categoryId, this.pageIndex));
  }
  getArticleItemsList(pageIndex: number) {
    this.articlesService.getAllArticles(pageIndex).subscribe(
      itemsList => {
        this.articleItemsList = itemsList;
        this.loadArticlesListComponent(itemsList);
        },
    () => {},
      () => { }
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
    this.router.navigate(['articles/p', this.pageIndex]);
    this.getArticleItemsList(this.pageIndex);
  }
}
