import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagementComponent} from './management.component';
import {ArticlesTableComponent} from '../../components/management/articles-table/articles-table.component';
import {ArticlesManagementComponent} from '../../components/management/articles-management/articles-management.component';

const routes: Routes = [
  {
    path: 'management',
    component: ManagementComponent,
    children: [
      {
        path: 'tables',
        component: ArticlesTableComponent
      },
      {
        path: 'articles',
        component: ArticlesManagementComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
