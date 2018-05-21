import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleItemComponent} from '../../components/article-item/article-item.component';
import {ArticlesListComponent} from '../../components/articles-list/articles-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule, Routes} from '@angular/router';
import {AllArticlesComponent} from './all-articles.component';
import {ArticlesService} from '../../services/articles.service';

const allArticlesRoutes: Routes = [
  {
    path: 'articles',
    component: AllArticlesComponent,
    // children: [
    //   {
    //     path: '',
    //     component: AllArticlesComponent,
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'p/:pageIndex'
    //   }
    // ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(allArticlesRoutes),
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    ArticleItemComponent,
    ArticlesListComponent,
    AllArticlesComponent
  ],
  providers: [ArticlesService]
})
export class AllArticlesModule { }
