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
import {AllArticlesModule} from './nodes/all-articles/all-articles.module';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/articles',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    NgZorroAntdModule.forRoot(),
    AllArticlesModule,
    ArticleModule,
    SidebarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
