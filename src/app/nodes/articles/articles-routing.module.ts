import {RouterModule, Routes} from '@angular/router';
import {ArticlesComponent} from './articles.component';
import {NgModule} from '@angular/core';

const articlesRoutes: Routes = [
  {
    path: 'articles',
    component: ArticlesComponent,
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
];

@NgModule({
  imports: [
    RouterModule.forChild(articlesRoutes)
  ],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
