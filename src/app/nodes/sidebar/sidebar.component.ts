import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {SideInformation} from '../../data-model/side-information';

@Component({
  selector: 'app-sidebar',
  template: `
    <app-side-info [infoTitle]="'最新文章'" [extraTitle]="'more'" [extraUrl]="''" [infos]="latestArticles$"
                   [loading]="latestArticlesLoading" [baseHref]="'/blog/article/'" >
    </app-side-info>
    <app-side-info [infoTitle]="'最热文章'" [infos]="popularArticles$" 
                   [loading]="popularArticlesLoading" [baseHref]="'/blog/article/'"></app-side-info>
    <app-side-info [infoTitle]="'文章分类'" [infos]="categories$" [loading]="categoriesLoading" 
                   [baseHref]="'/blog/articles/category/'"></app-side-info>
  `,
  styles: []
})
export class SidebarComponent implements OnInit {
  latestArticles$: SideInformation[];
  latestArticlesLoading = false;
  popularArticles$: SideInformation[];
  popularArticlesLoading = false;
  categories$: SideInformation[];
  categoriesLoading = false;
  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.getLatestArticles();
    this.getPopularArticles();
    this.getCategories();
  }
  getLatestArticles() {
    this.latestArticlesLoading = true;
    this.sidebarService.getLatestArticles().subscribe((latestArticlesCollection) => {
      this.latestArticles$ = latestArticlesCollection.items;
    },
      () => {  },
      () => { this.latestArticlesLoading = false; });
  }
  getPopularArticles() {
    this.popularArticlesLoading = true;
    this.sidebarService.getPopularArticles().subscribe(
      popularArticlesCollection => { this.popularArticles$ = popularArticlesCollection.items; },
      () => {},
      () => { this.popularArticlesLoading = false; }
    );
  }
  getCategories() {
    this.categoriesLoading = true;
    this.sidebarService.getCategories().subscribe(
      categoriesCollection => { this.categories$ = categoriesCollection.items; },
      () => {},
      () => { this.categoriesLoading = false; }
    );
  }
}

