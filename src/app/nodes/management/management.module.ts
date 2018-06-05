import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import {ManagementComponent} from './management.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import { AllArticlesManagementComponent } from '../../components/management/articles-management/all-articles-management/all-articles-management.component';
import { PublishedArticlesManagementComponent } from '../../components/management/articles-management/published-articles-management/published-articles-management.component';
import { DraftsManagementComponent } from '../../components/management/articles-management/drafts-management/drafts-management.component';
import { DeletedArticlesManagementComponent } from '../../components/management/articles-management/deleted-articles-management/deleted-articles-management.component';
import {ManagementService} from '../../services/management.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule.forRoot(),
    ManagementRoutingModule
  ],
  declarations: [
    ManagementComponent,
    AllArticlesManagementComponent,
    PublishedArticlesManagementComponent,
    DraftsManagementComponent,
    DeletedArticlesManagementComponent,
  ],
  providers: [ManagementService]
})
export class ManagementModule { }
