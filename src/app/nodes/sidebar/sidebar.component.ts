import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {SideInformation} from '../../entities/side-information';

@Component({
  selector: 'app-sidebar',
  template: `
    <app-side-info [infoTitle]="'Latest articles'" [extraTitle]="'more'" [extraUrl]="''" [infos]="latestArticles$"
                   [loading]="latestArticlesLoading" >
    </app-side-info>
    <app-side-info [infoTitle]="'Popular articles'" [infos]="popularArticles$" [loading]="popularArticlesLoading"></app-side-info>
    <app-side-info [infoTitle]="'Categories'" [infos]="categories$" [loading]="categoriesLoading"></app-side-info>
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
    this.sidebarService.getLatestArticles().subscribe((latestArticles) => {
      this.latestArticles$ = latestArticles;
    },
      () => {  },
      () => { this.latestArticlesLoading = false; });
  }
  getPopularArticles() {
    this.popularArticlesLoading = true;
    this.sidebarService.getPopularArticles().subscribe(
      popularArticles => { this.popularArticles$ = popularArticles; },
      () => {},
      () => { this.popularArticlesLoading = false; }
    );
  }
  getCategories() {
    this.categoriesLoading = true;
    this.sidebarService.getCategories().subscribe(
      categories => { this.categories$ = categories; },
      () => {},
      () => { this.categoriesLoading = false; }
    );
  }
}

