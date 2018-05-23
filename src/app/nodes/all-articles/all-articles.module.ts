import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleItemComponent} from '../../components/article-item/article-item.component';
import {ArticlesListComponent} from '../../components/articles-list/articles-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule, Routes} from '@angular/router';
import {AllArticlesComponent} from './all-articles.component';
import {ArticlesService} from '../../services/articles.service';
import {ArticlesDirective} from './articles.directive';

const allArticlesRoutes: Routes = [
  {
    path: 'articles',
    component: AllArticlesComponent,
    children: [
      {
        path: '',
        component: AllArticlesComponent,
      },
      {
        path: 'p/:pageIndex',
        component: AllArticlesComponent,
      },
      {
        path: 'category/:categoryId',
        component: AllArticlesComponent,
        children: [
          {
            path: '',
            component: AllArticlesComponent,
          },
          {
            path: 'p/:pageIndex',
            component: AllArticlesComponent,
          },
        ]
      }
    ]
  },
];
const allArticlesRoutes2: Routes = [
  {
    path: 'articles',
    component: AllArticlesComponent,
  },
  {
    path: 'articles/p/:pageIndex',
    component: AllArticlesComponent,
  },
  {
    path: 'articles/category/:categoryId',
    component: AllArticlesComponent,
  },
  {
    path: 'articles/category/:categoryId/p/:pageIndex',
    component: AllArticlesComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(allArticlesRoutes2),
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    ArticleItemComponent,
    ArticlesListComponent,
    AllArticlesComponent,
    ArticlesDirective
  ],
  providers: [ArticlesService],
  entryComponents: [ArticlesListComponent]
})
export class AllArticlesModule { }
