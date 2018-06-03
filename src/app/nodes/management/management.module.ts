import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import {ManagementComponent} from './management.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { ArticlesTableComponent } from '../../components/management/articles-table/articles-table.component';
import {FormsModule} from '@angular/forms';
import { ArticlesManagementComponent } from '../../components/management/articles-management/articles-management.component';
import { CategoriesTableComponent } from '../../components/management/categories-table/categories-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule.forRoot(),
    ManagementRoutingModule
  ],
  declarations: [
    ArticlesTableComponent,
    ManagementComponent,
    ArticlesManagementComponent,
    CategoriesTableComponent
  ]
})
export class ManagementModule { }
