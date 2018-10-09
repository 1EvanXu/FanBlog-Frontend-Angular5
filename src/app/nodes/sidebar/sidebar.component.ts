import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {SideInformation} from '../../data-model/side-information';

@Component({
  selector: 'app-sidebar',
  template: `
    <app-side-info [infoTitle]="'Latest'" [extraTitle]="'more'" [extraUrl]="''" [infos]="latestArticles"
                   [loading]="latestArticlesLoading" [baseHref]="'/blog/site/article/'" >
    </app-side-info>
    <app-side-info [infoTitle]="'Popular'" [infos]="popularArticles" 
                   [loading]="popularArticlesLoading" [baseHref]="'/blog/site/article/'"></app-side-info>
    <app-side-info [infoTitle]="'Categories'" [infos]="categories" [loading]="categoriesLoading" 
                   [baseHref]="'/blog/site/articles/category/'"></app-side-info>
  `,
  styles: []
})
export class SidebarComponent implements OnInit {
  latestArticles: SideInformation[];
  latestArticlesLoading = false;
  popularArticles: SideInformation[];
  popularArticlesLoading = false;
  categories: SideInformation[];
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
      this.latestArticles = latestArticlesCollection.items;
    },
      () => {  },
      () => { this.latestArticlesLoading = false; });
  }
  getPopularArticles() {
    this.popularArticlesLoading = true;
    this.sidebarService.getPopularArticles().subscribe(
      popularArticlesCollection => { this.popularArticles = popularArticlesCollection.items; },
      () => {},
      () => { this.popularArticlesLoading = false; }
    );
  }
  getCategories() {
    this.categoriesLoading = true;
    this.sidebarService.getCategories().subscribe(
      categoriesCollection => { this.categories = categoriesCollection.items; },
      () => {},
      () => { this.categoriesLoading = false; }
    );
  }
}

