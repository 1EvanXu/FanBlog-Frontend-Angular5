import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import {ManagementComponent} from './management.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import { PublishedArticlesManagementComponent } from './articles-management/published-articles-management/published-articles-management.component';
import { DraftsManagementComponent } from './articles-management/drafts-management/drafts-management.component';
import { DeletedArticlesManagementComponent } from './articles-management/deleted-articles-management/deleted-articles-management.component';
import {ManagementService} from '../../services/management.service';
import { CategoriesManagementComponent } from './categories-management/categories-management.component';
import {ManagementApiClient} from '../../apis/management.api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule.forRoot(),
    ManagementRoutingModule
  ],
  declarations: [
    ManagementComponent,
    PublishedArticlesManagementComponent,
    DraftsManagementComponent,
    DeletedArticlesManagementComponent,
    CategoriesManagementComponent,
  ],
  providers: [ManagementService, ManagementApiClient]
})
export class ManagementModule { }
