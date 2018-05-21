import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleContentComponent} from '../../components/article-content/article-content.component';
import {ArticleComponent} from './article.component';
import {CommentaryModule} from '../../components/commentary/commentary.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule, Routes} from '@angular/router';

const articleRoutes: Routes = [
  {
    path: 'article',
    component: ArticleComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    CommentaryModule,
    RouterModule.forChild(articleRoutes),
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    ArticleComponent,
    ArticleContentComponent,
  ],
  exports: [
    ArticleComponent
  ]
})
export class ArticleModule { }
