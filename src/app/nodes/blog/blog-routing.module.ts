import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticlesComponent} from '../articles/articles.component';
import {ArticleComponent} from '../article/article.component';
import {BlogComponent} from './blog.component';

const blogRoutes: Routes = [
  {
    path: 'site',
    component: BlogComponent,
    children: [
      {
        path: 'articles',
        children: [
          {
            path: 'all',
            component: ArticlesComponent,
          },
          {
            path: 'category/:categoryId',
            component: ArticlesComponent,
          },
          {
            path: 'search',
            component: ArticlesComponent
          },
          {
            path: '',
            redirectTo: 'all',
            pathMatch: 'full',
          }
        ]
      },
      {
        path: 'article/:pubId',
        component: ArticleComponent
      },
      {
        path: '',
        redirectTo: 'articles',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
