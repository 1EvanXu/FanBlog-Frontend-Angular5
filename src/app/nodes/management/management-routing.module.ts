import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagementComponent} from './management.component';
import {PublishedArticlesManagementComponent} from './articles-management/published-articles-management/published-articles-management.component';
import {DraftsManagementComponent} from './articles-management/drafts-management/drafts-management.component';
import {DeletedArticlesManagementComponent} from './articles-management/deleted-articles-management/deleted-articles-management.component';
import {CategoriesManagementComponent} from './categories-management/categories-management.component';
import {AuthGuardService} from '../../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'management',
    component: ManagementComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'articles',
        children: [
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
            redirectTo: 'published',
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
