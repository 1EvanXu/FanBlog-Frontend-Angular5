import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleItemComponent} from '../../components/article-item/article-item.component';
import {ArticlesListComponent} from '../../components/articles-list/articles-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ArticlesComponent} from './articles.component';
import {PublishedArticleItemsService} from '../../services/published-article-items.service';
import {ArticlesDirective} from './articles.directive';
import {RouterModule} from '@angular/router';
import {PublishedArticlesItemsApiClient} from '../../apis/published-article-items.api.service';



@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule.forRoot(),
    RouterModule
    // ArticlesRoutingModule
  ],
  declarations: [
    ArticleItemComponent,
    ArticlesListComponent,
    ArticlesComponent,
    ArticlesDirective
  ],
  providers: [PublishedArticleItemsService, PublishedArticlesItemsApiClient],
  entryComponents: [ArticlesListComponent]
})
export class ArticlesModule { }
