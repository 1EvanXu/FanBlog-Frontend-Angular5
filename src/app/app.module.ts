import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {ArticleModule} from './nodes/article/article.module';
import {RouterModule, Routes} from '@angular/router';
import { ErrorComponent } from './nodes/error/error.component';
import {SidebarModule} from './nodes/sidebar/sidebar.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ArticlesModule} from './nodes/articles/articles.module';
import {AppRoutingModule} from './app-routing.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    NgZorroAntdModule.forRoot(),
    ArticlesModule,
    ArticleModule,
    SidebarModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
