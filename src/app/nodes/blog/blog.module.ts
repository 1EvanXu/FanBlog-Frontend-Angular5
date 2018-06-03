import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ArticleModule} from '../article/article.module';
import {BreadcrumbService} from '../../services/channel.service';
import {FormsModule} from '@angular/forms';
import {SidebarModule} from '../sidebar/sidebar.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ArticlesModule} from '../articles/articles.module';
import {BreadcrumbComponent} from '../../components/breadcrumb/breadcrumb.component';
import {BlogComponent} from './blog.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    BlogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NoopAnimationsModule,
    NgZorroAntdModule.forRoot(),
    ArticlesModule,
    ArticleModule,
    SidebarModule,
    BlogRoutingModule
  ],
  providers: [BreadcrumbService],
})
export class BlogModule { }
