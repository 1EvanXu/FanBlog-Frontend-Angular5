import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagementComponent} from './management.component';
import {AllArticlesManagementComponent} from './articles-management/all-articles-management/all-articles-management.component';
import {PublishedArticlesManagementComponent} from './articles-management/published-articles-management/published-articles-management.component';
import {DraftsManagementComponent} from './articles-management/drafts-management/drafts-management.component';
import {DeletedArticlesManagementComponent} from './articles-management/deleted-articles-management/deleted-articles-management.component';
import {CategoriesManagementComponent} from './categories-management/categories-management.component';

const routes: Routes = [
  {
    path: 'management',
    component: ManagementComponent,
    children: [
      {
        path: 'articles',
        children: [
          {
            path: 'all',
            component: AllArticlesManagementComponent
          },
          {
            path: 'published',
            component: PublishedArticlesManagementComponent
          },
          {
            path: 'draft',
            component: DraftsManagementComponent
          },
          {
            path: 'deleted',
            component: DeletedArticlesManagementComponent
          },
          {
            path: '',
            redirectTo: 'all',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'categories',
        component: CategoriesManagementComponent
      },
      {
        path: '',
        redirectTo: 'articles',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
